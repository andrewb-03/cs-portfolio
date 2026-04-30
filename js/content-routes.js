/**
 * Content route metadata for AI-first portfolio navigation.
 * Maps linkable content to routes, keywords, and CTA labels.
 * Add new entries here to extend contextual navigation.
 */
const CONTENT_ROUTES = [
  {
    id: 'project-sworn-in',
    title: 'Sworn In USA — E-Commerce Web Application',
    route: 'projects.html#project-sworn-in',
    keywords: ['sworn', 'sworn in', 'sworn in usa', 'ecommerce', 'e-commerce', 'clothing', 'brand', 'shop', 'store', 'shopify', 'twilio', 'next.js', 'nextjs', 'typescript', 'vercel', 'freelance', 'checkout', 'cart', 'sms', 'notification'],
    buttonLabel: 'View Project',
  },
  {
    id: 'project-budgeting',
    title: 'Student Budgeting Platform',
    route: 'projects.html#project-budgeting',
    keywords: ['budget', 'budgeting', 'plaid', 'limoney', 'limóney', 'fullstack', 'full-stack', 'student', 'financial', 'expense', 'react', 'mysql', 'docker', 'aws'],
    buttonLabel: 'View Project',
  },
  {
    id: 'project-routing',
    title: 'Optimal Routing for Self-Driving Cars',
    route: 'projects.html#project-routing',
    keywords: ['routing', 'self-driving', 'drivebot', 'algorithm', 'graph', 'dynamic programming', 'fleet', 'autonomous', 'car', 'vehicle', 'python'],
    buttonLabel: 'View Project',
  },
  {
    id: 'project-driver',
    title: 'Custom Linux Device Driver',
    route: 'projects.html#project-driver',
    keywords: ['driver', 'device', 'linux', 'kernel', 'encryption', 'ioctl', 'module', 'c programming', 'systems programming'],
    buttonLabel: 'View Project',
  },
  {
    id: 'about',
    title: 'About Andrew',
    route: 'about.html',
    keywords: ['about', 'who', 'background', 'bio', 'introduce', 'introduction', 'experience', 'career'],
    buttonLabel: 'About Me',
  },
  {
    id: 'skills',
    title: 'Skills',
    route: 'skills.html',
    keywords: ['skill', 'skills', 'technologies', 'tech', 'languages', 'proficient', 'expertise'],
    buttonLabel: 'View Skills',
  },
  {
    id: 'education',
    title: 'Education',
    route: 'education.html',
    keywords: ['education', 'degree', 'university', 'school', 'sfsu', 'san francisco', 'graduate', 'graduated'],
    buttonLabel: 'View Education',
  },
  {
    id: 'projects',
    title: 'Projects',
    route: 'projects.html',
    keywords: ['project', 'projects', 'work', 'portfolio', 'built', 'developed'],
    buttonLabel: 'View All Projects',
  },
  {
    id: 'resume',
    title: 'Resume',
    route: 'resume.html',
    keywords: ['resume', 'cv', 'download', 'pdf', 'experience', 'hire', 'hiring'],
    buttonLabel: 'Download Resume',
  },
  {
    id: 'contact',
    title: 'Contact',
    route: 'contact.html',
    keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'linkedin', 'github', 'location', 'bay area'],
    buttonLabel: 'Get in Touch',
  },
];

/**
 * Scores a content route against the user's question.
 * Returns a non-negative score; higher = better match.
 */
function scoreRoute(route, question) {
  const q = question.toLowerCase().trim();
  let score = 0;
  for (const kw of route.keywords) {
    if (q.includes(kw.toLowerCase())) {
      score += 1;
    }
  }
  return score;
}

/**
 * Finds the best matching content route for a question.
 * Prefers more specific matches (e.g. individual project over general projects).
 * Returns the route object or null if no match above threshold.
 */
function matchContentRoute(question, minScore = 1) {
  if (!question || !question.trim()) return null;
  let best = null;
  let bestScore = minScore - 1;
  for (const route of CONTENT_ROUTES) {
    const s = scoreRoute(route, question);
    if (s > bestScore) {
      bestScore = s;
      best = route;
    }
  }
  return best;
}

// Export for use in script.js (global in non-module context)
window.CONTENT_ROUTES = CONTENT_ROUTES;
window.matchContentRoute = matchContentRoute;
