// AI Chat — Portfolio Agent (cleaned for the single-page redesign)
// API_BASE from api-config.js (loads first): '' = same-origin, or explicit URL for local/mobile/production
const API_BASE = typeof window.PORTFOLIO_API_URL === 'string'
    ? window.PORTFOLIO_API_URL
    : 'http://localhost:8000';

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function appendUserQuestion(messagesEl, question) {
    const line = document.createElement('div');
    line.className = 'terminal-line chat-message-line';
    line.innerHTML = `
        <span class="prompt">$</span>
        <span class="command">${escapeHtml(question)}</span>
    `;
    messagesEl.appendChild(line);
}

function renderMarkdown(text) {
    if (typeof marked !== 'undefined') {
        return marked.parse(text, { breaks: true });
    }
    return escapeHtml(text);
}

function appendAgentOutput(messagesEl, text, isError = false, matchedRoute = null) {
    const output = document.createElement('div');
    output.className = 'terminal-output chat-output' + (isError ? ' chat-error-msg' : '');
    output.innerHTML = isError ? escapeHtml(text) : renderMarkdown(text);
    messagesEl.appendChild(output);

    if (!isError && matchedRoute) {
        const ctaWrap = document.createElement('div');
        ctaWrap.className = 'chat-cta-wrap';
        const cta = document.createElement('a');
        cta.href = matchedRoute.route;
        cta.className = 'chat-cta-btn';
        cta.textContent = matchedRoute.buttonLabel;
        if (matchedRoute.external) {
            cta.target = '_blank';
            cta.rel = 'noopener';
        }
        ctaWrap.appendChild(cta);
        messagesEl.appendChild(ctaWrap);
    }
    return output;
}

function appendLoading(messagesEl) {
    const line = document.createElement('div');
    line.className = 'terminal-line chat-loading-line';
    line.id = 'chat-loading';
    line.innerHTML = `
        <span class="prompt">$</span>
        <span class="chat-loading-dots"><span>.</span><span>.</span><span>.</span></span>
    `;
    messagesEl.appendChild(line);
}

function removeLoading() {
    const loading = document.getElementById('chat-loading');
    if (loading) loading.remove();
}

function scrollToBottom() {
    const messages = document.getElementById('chat-messages');
    if (messages) messages.scrollTop = messages.scrollHeight;
}

/* Scrolls WITHIN the chat log so the start of `el` is visible.
   Never touches page scroll — this replaces the old scrollIntoView,
   which dragged the whole document on the redesigned page. */
function scrollChatTo(messagesEl, el) {
    const top = el.getBoundingClientRect().top
              - messagesEl.getBoundingClientRect().top
              + messagesEl.scrollTop;
    messagesEl.scrollTo({ top: Math.max(top - 8, 0), behavior: 'smooth' });
}

async function askAgent(question) {
    const messagesEl = document.getElementById('chat-messages');
    const inputEl = document.getElementById('chat-input');
    const errorEl = document.getElementById('chat-error');
    const sendBtn = document.getElementById('chat-send');

    if (!question.trim()) return;

    inputEl.disabled = true;
    if (sendBtn) sendBtn.disabled = true;
    errorEl.textContent = '';
    errorEl.classList.remove('visible');

    appendUserQuestion(messagesEl, question);
    appendLoading(messagesEl);
    scrollToBottom();

    let scrolledToStart = false;
    try {
        const res = await fetch(`${API_BASE}/ask?question=${encodeURIComponent(question)}`);
        const data = await res.json();

        removeLoading();

        if (!res.ok) {
            appendAgentOutput(messagesEl, data.detail || 'Something went wrong. Please try again.', true);
        } else {
            const matchedRoute = typeof matchContentRoute === 'function' ? matchContentRoute(question) : null;
            const output = appendAgentOutput(messagesEl, data.answer || 'No response.', false, matchedRoute);
            if (output) {
                scrollChatTo(messagesEl, output);
                scrolledToStart = true;
            }
        }
    } catch (err) {
        removeLoading();
        appendAgentOutput(messagesEl, 'Could not reach the AI right now — it may be waking up. Try again in a few seconds, or email me directly.', true);
        errorEl.textContent = err.message || 'Network error';
        errorEl.classList.add('visible');
    }

    inputEl.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
    inputEl.value = '';
    inputEl.focus({ preventScroll: true });
    if (!scrolledToStart) scrollToBottom();
}

document.addEventListener('DOMContentLoaded', function () {
    const inputEl = document.getElementById('chat-input');
    const messagesEl = document.getElementById('chat-messages');
    const sendBtn = document.getElementById('chat-send');

    if (!inputEl || !messagesEl) return;

    function send() {
        const q = inputEl.value.trim();
        if (q) askAgent(q);
    }

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            send();
        }
    });

    if (sendBtn) sendBtn.addEventListener('click', send);

    document.querySelectorAll('.suggestion-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const q = btn.getAttribute('data-question');
            if (q) askAgent(q);
        });
    });
    // No autofocus on load: it pops the keyboard on mobile and can shift the page.
});
