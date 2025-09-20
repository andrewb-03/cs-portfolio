//MOCKED CHAT --------------------------------------------------------------------------------------------------------------
// const express = require('express');
// const router = express.Router();
// require('dotenv').config();

// // Full list of supported months
// const monthNames = [
//   'january','february','march','april','may','june',
//   'july','august','september','october','november','december'
// ];

// router.post('/budget-chat', async (req, res) => {
//   console.log(' /api/budget-chat (MOCK) hit');
//   let { query: userQuery, transactions = [], year, month } = req.body;

//   const lowerQuery = userQuery.toLowerCase();

//   // Only continue if it's a budget-related query
//   const isBudgetRequest = /(budget|spending plan|plan my spending|make a budget|budgeting help)/i.test(lowerQuery);
//   if (!isBudgetRequest) {
//     return res.json({
//       reply: "I'm here to create your budget. For other financial help, please use the LemonAid chat instead."
//     });
//   }

//   //  Parse month + year override from query
//   const now = new Date();
//   const foundMonth = monthNames.find(m => lowerQuery.includes(m));
//   const foundYear = lowerQuery.match(/\b(20\d{2})\b/);
//   const overrideYear = foundYear ? parseInt(foundYear[1]) : null;

//   if (!foundMonth && !foundYear) {
//     return res.json({
//       reply: " Please include a month and year in your request (e.g., 'budget for June 2024') to generate a budget plan."
//     });
//   }

//   if (foundMonth) {
//     month = monthNames.indexOf(foundMonth); // 0-based index
//     year = overrideYear || now.getFullYear();
//     console.log(` Overriding to: ${foundMonth} ${year}`);
//   } else {
//     // fallback to values from body
//     month = parseInt(month);
//     year = parseInt(year);
//   }

//   const selectedLabel = `${new Date(year, month).toLocaleString('default', {
//     month: 'long',
//   })} ${year}`;

//   // Use actual pfcPrimary categories from your DB
//   const mockReply = `
// ENTERTAINMENT: $120
// GENERAL_MERCHANDISE: $60
// FOOD_AND_DRINK: $150
// LOAN_PAYMENTS: $200
// TRANSPORTATION: $90
// GENERAL_SERVICES: $45
// PERSONAL_CARE: $30
// TRAVEL: $75
//   `.trim();
// //add of needed^ 
// //INCOME: $2500

//   console.log(` Sending mock budget plan for: ${selectedLabel}`);
//   res.json({
//     reply: mockReply,
//     parsedMonth: month,
//     parsedYear: year
//   });
// });

// module.exports = router;






 
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function retryGeminiCall(prompt, retries = 3, delayMs = 1000) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.error(`❌ Gemini attempt ${i + 1}/${retries}:`, err);
      if ((err.status === 503 || err.status === 429) && i < retries - 1) {
        const delay = err.errorDetails?.retryDelay || delayMs * Math.pow(2, i);
        console.warn(`⚠️ Gemini ${err.status} — retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
      } else {
        throw err;
      }
    }
  }
  throw new Error('Max retries reached');
}

const monthNames = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

const staticCategories = [
  'ENTERTAINMENT',
  'GENERAL_MERCHANDISE',
  'FOOD_AND_DRINK',
  'LOAN_PAYMENTS',
  'TRANSPORTATION',
  'GENERAL_SERVICES',
  'PERSONAL_CARE',
  'TRAVEL'
];

router.post('/budget-chat', async (req, res) => {
  console.log('🟡 /api/budget-chat (Gemini LIVE) hit');

  let { query: userQuery, transactions = [], year, month } = req.body;
  if (!userQuery) {
    return res.status(400).json({
      reply: 'Invalid request: query is required.'
    });
  }
  const lowerQuery = userQuery.toLowerCase();
  const now = new Date();

  const isBudgetRequest = /(budget|spending plan|plan my spending|make a budget|budgeting help)/i.test(lowerQuery);
  if (!isBudgetRequest) {
    return res.json({
      reply: "I'm here to create your budget. For other financial help, please use the LemonAid chat instead."
    });
  }

  const foundMonth = monthNames.find(m => lowerQuery.includes(m));
  const foundYear = lowerQuery.match(/\b(20\d{2})\b/);
  const overrideYear = foundYear ? parseInt(foundYear[1]) : null;

  if (!foundMonth && !foundYear) {
    return res.json({
      reply: "📅 Please include a month and year in your request (e.g., 'budget for June 2024') to generate a budget plan."
    });
  }


  if (foundMonth) {
    month = monthNames.indexOf(foundMonth);
    year = overrideYear || now.getFullYear();
    const requestDate = new Date(year, month);
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth());

    if (requestDate < startOfCurrentMonth) {
      return res.json({
        reply: "⚠️ I can only create budget plans for the current month or future months. Please try again with a more recent date ⚠️"
      });
    }
    console.log(`📅 Generating budget for: ${foundMonth} ${year}`);
  } else {
    month = parseInt(month);
    year = parseInt(year);
  }



  const requestedKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  let selectedMonthData = null;
  let selectedLabel = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

  // Group transactions by category to calculate averages, only for expenses
  const categoryAverages = {};
  const monthlyCounts = new Set();

  transactions
    .filter(tx => tx.date && !isNaN(parseFloat(tx.amount)) && tx.type === 'expense')
    .forEach(tx => {
      const date = new Date(tx.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const category = tx.pfcPrimary || 'Uncategorized';
      const amount = parseFloat(tx.amount);

      if (!categoryAverages[category]) {
        categoryAverages[category] = { expense: 0, months: new Set() };
      }
      categoryAverages[category].expense += amount;
      categoryAverages[category].months.add(key);
      monthlyCounts.add(key);
    });

  // Log raw totals for debugging
  Object.entries(categoryAverages).forEach(([category, data]) => {
    console.log(`📈 Category ${category}: Total Expense = $${data.expense.toFixed(2)}, Months = ${data.months.size}`);
  });

  // Calculate average expenses per category
  const averagedData = { expense: 0, categories: {} };
  Object.entries(categoryAverages).forEach(([category, data]) => {
    const monthCount = data.months.size || 1; // Avoid division by zero
    if (monthCount > 0) {
      averagedData.categories[category] = {
        expense: data.expense / monthCount
      };
      averagedData.expense += data.expense / monthCount;
    }
  });

  selectedMonthData = Object.keys(categoryAverages).length > 0 ? averagedData : null;

  const categoryLines = selectedMonthData
    ? Object.entries(selectedMonthData.categories)
        .filter(([cat, v]) => v.expense > 0 && cat !== 'Uncategorized' && staticCategories.includes(cat))
        .map(([cat, val]) => `${cat}: $${val.expense.toFixed(2)}`)
        .join('\n')
    : 'No valid expense data found; generating budget based on typical spending patterns.';

  console.log(`📊 Using averaged expense data for ${requestedKey}: ${categoryLines}`);

  const prompt = `You are a smart budget planner. Generate a realistic monthly budget for ${selectedLabel} using the user's average monthly expenses as a guide.

Guidelines:
- Think for yourself and propose a **balanced** budget using the provided averages.
- Use the provided average expense values as your **baseline input**.
- Use proportional thinking: if one category is dominating, rebalance across others based on averages.
- Round each amount to two decimal places.
- DO NOT include income or income-related categories (e.g., INCOME).
- ONLY return a list of category: $amount lines for the following expense categories: ${staticCategories.join(', ')}.
- Do NOT include any explanations, summaries, or text outside of the budget Jonah lines.
- STICK TO AVERAGE expenses for making the budget, even if amounts are high, to accommodate all users.

Month: ${selectedLabel}
${categoryLines}`;

  try {
    const reply = await retryGeminiCall(prompt);
    console.log('✅ Gemini budget generated');
    console.log('Gemini reply:', reply);
    res.json({ reply, parsedMonth: month, parsedYear: year });
  } catch (err) {
    console.error('❌ Gemini error:', err);
    const isQuotaError = err.status === 429;
    res.status(isQuotaError ? 429 : 503).json({
      reply: isQuotaError
        ? "⚠️ Budget assistant has reached its daily limit. Please try again tomorrow or contact support ⚠️"
        : "⚠️ Budget assistant is temporarily unavailable ⚠️",
      parsedMonth: month,
      parsedYear: year
    });
  }
});

module.exports = router;