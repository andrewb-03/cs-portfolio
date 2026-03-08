// AI Chat - Portfolio Agent
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
    const lastLine = messagesEl.querySelector('.chat-message-line:last-of-type');
    const question = lastLine ? lastLine.querySelector('.command')?.textContent : '';

    const output = document.createElement('div');
    output.className = 'terminal-output chat-output' + (isError ? ' chat-error-msg' : '');
    const contentHtml = isError ? escapeHtml(text) : renderMarkdown(text);
    output.innerHTML = contentHtml;
    messagesEl.appendChild(output);

    if (!isError && matchedRoute && typeof matchContentRoute === 'function') {
        const ctaWrap = document.createElement('div');
        ctaWrap.className = 'chat-cta-wrap';
        const cta = document.createElement('a');
        cta.href = matchedRoute.route;
        cta.className = 'chat-cta-btn';
        cta.textContent = matchedRoute.buttonLabel;
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
                output.scrollIntoView({ block: 'start', behavior: 'smooth' });
                scrolledToStart = true;
            }
        }
    } catch (err) {
        removeLoading();
        appendAgentOutput(messagesEl, 'Could not reach the AI. Is the backend running? Try: uvicorn main:app --reload', true);
        errorEl.textContent = err.message || 'Network error';
        errorEl.classList.add('visible');
    }

    inputEl.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
    inputEl.value = '';
    inputEl.focus();
    if (!scrolledToStart) scrollToBottom();
}

document.addEventListener('DOMContentLoaded', function() {
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

    const cursorEl = document.getElementById('chat-cursor');
    inputEl.addEventListener('focus', () => cursorEl?.classList.add('focused'));
    inputEl.addEventListener('blur', () => cursorEl?.classList.remove('focused'));
    inputEl.focus();
});

// Mobile Navigation Toggle (guarded; nav is hidden in AI-first mode)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-content, .stat');
    animateElements.forEach(el => observer.observe(el));
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active class to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Auto-detect project images
    document.querySelectorAll('.project-image').forEach(wrapper => {
        const img = wrapper.querySelector('img');
        if (!img) return;
        const testImage = new Image();
        testImage.onload = () => {
            wrapper.classList.add('has-image');
        };
        testImage.onerror = () => {
            wrapper.classList.remove('has-image');
        };
        testImage.src = img.getAttribute('src');
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #111111 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style); 