/**
 * @file lemonaid.js
 * @summary Connects user queries to Google's Gemini API for AI-generated responses via /lemonaid-chat.  
 * Initializes and invokes the generative model using the provided API key from environment variables.  
 * Logs user input and AI replies, returning generated text back to the frontend.
 */

 
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Retry wrapper
async function retryGeminiCall(prompt, retries = 3, delayMs = 1000) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      if (err.status === 503 && i < retries - 1) {
        console.warn(`⚠️ Gemini 503 — retrying in ${delayMs}ms...`);
        await new Promise(r => setTimeout(r, delayMs));
      } else {
        throw err;
      }
    }
  }
}

function parseRequestedMonthYear(text) {
  const monthNames = [
    'january','february','march','april','may','june',
    'july','august','september','october','november','december'
  ];

  const lowerText = text.toLowerCase();
  for (let i = 0; i < monthNames.length; i++) {
    const regex = new RegExp(`${monthNames[i]}\\s+(\\d{4})`);
    const match = lowerText.match(regex);
    if (match) {
      return {
        month: i,
        year: parseInt(match[1]),
        key: `${match[1]}-${String(i + 1).padStart(2, '0')}`,
        label: `${monthNames[i][0].toUpperCase() + monthNames[i].slice(1)} ${match[1]}`
      };
    }
  }

  return null;
}

function parseRelativeMonthYear(text, fallbackYear, fallbackMonth) {
  const lower = text.toLowerCase();
  const today = new Date(fallbackYear, fallbackMonth);

  if (lower.includes("this month")) {
    return { year: today.getFullYear(), month: today.getMonth() };
  }

  if (lower.includes("last month")) {
    const last = new Date(today.getFullYear(), today.getMonth() - 1);
    return { year: last.getFullYear(), month: last.getMonth() };
  }

  if (lower.includes("next month")) {
    const next = new Date(today.getFullYear(), today.getMonth() + 1);
    return { year: next.getFullYear(), month: next.getMonth() };
  }

  return null;
}

router.post('/lemonaid-chat', async (req, res) => {
  console.log('/api/lemonaid-chat endpoint hit');

  const { query: userQuery, transactions = [], budgets = [], year, month } = req.body;
  console.log('User query:', userQuery);

  try {
    const currentDateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const parsed = parseRequestedMonthYear(userQuery);
    const relative = parseRelativeMonthYear(userQuery, year, month);

    const selectedYear = parsed?.year ?? relative?.year ?? year;
    const selectedMonth = parsed?.month ?? relative?.month ?? Number(month);
    const selectedKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;
    const selectedLabel = `${new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })} ${selectedYear}`;

    const monthGroups = {};

    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const category = tx.category || 'Uncategorized';
      const amount = parseFloat(tx.amount);
      const isIncome = tx.type === 'income';

      if (!monthGroups[key]) {
        monthGroups[key] = { income: 0, expense: 0, categories: {} };
      }

      const group = monthGroups[key];
      if (!group.categories[category]) {
        group.categories[category] = { income: 0, expense: 0 };
      }

      if (isIncome) {
        group.income += amount;
        group.categories[category].income += amount;
      } else {
        group.expense += amount;
        group.categories[category].expense += amount;
      }
    });

    let selectedMonthData = monthGroups[selectedKey];
    if (!selectedMonthData) {
      const sortedKeys = Object.keys(monthGroups).sort().reverse();
      if (sortedKeys.length > 0) {
        selectedMonthData = monthGroups[sortedKeys[0]];
        console.warn(`⚠️ No data for ${selectedKey}. Falling back to ${sortedKeys[0]}`);
      }
    }

    const categoryLines = selectedMonthData
      ? Object.entries(selectedMonthData.categories)
          .filter(([, v]) => v.income > 0 || v.expense > 0)
          .map(([cat, val]) => `   • ${cat}: +$${val.income.toFixed(2)}, -$${val.expense.toFixed(2)}`)
          .join('\n')
      : 'No data found for this month.';

    // Check for budget-related request
    const isBudgetRequest = /budget|create.*budget|plan.*budget/i.test(userQuery);
    if (isBudgetRequest) {
      const reply = "To create a personalized budget, please go to the Budget AI section.";
      console.log('💬 Redirecting user to Budget AI.');
      return res.json({ reply });
    }

    // Check for simple greeting
    const isGreeting = /^(hi|hello|hey|yo|sup)[.! ]*$/i.test(userQuery.trim());
    if (isGreeting) {
      const reply = "Hello! I'm LemonAid. Say 'aid' so I can read your finances, and ask me anything about your money.";
      console.log('💬 Greeting detected. Minimal response sent.');
      return res.json({ reply });
    }

    // Only analyze finances if user says "aid" (not case sensitive)
    const mentionsAid = userQuery.toLowerCase().includes("aid");

    let prompt;
    if (mentionsAid) {
      prompt = `
You are LemonAid, a helpful financial AI assistant.

Today is ${currentDateStr}
The user asked: "${userQuery}"

Month: ${selectedLabel}
${categoryLines}

Use this financial data to answer the user's question as an assistant. Be helpful, warm, and informative.
`;
    } else {
      prompt = `
You are LemonAid, a helpful financial AI assistant.

Today is ${currentDateStr}
The user asked: "${userQuery}"

Respond to the user in a friendly and helpful way. DO NOT reference their financial data unless they say "aid".
`;
    }

    const reply = await retryGeminiCall(prompt);

    console.log('Gemini reply:', reply);
    res.json({ reply });
  } catch (err) {
    console.error('Gemini error:', err.message);
	console.error('📦 Full Gemini response:', err.response?.data || err.stack);
  	console.log('🔑 GEMINI_API_KEY loaded?', !!process.env.GEMINI_API_KEY);
    res.status(503).json({
      reply: "I'm currently overloaded. Please try again shortly!"
    });
  }
});

module.exports = router;
