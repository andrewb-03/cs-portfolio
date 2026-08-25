/**
 * Content route metadata for AI-first portfolio navigation.
 * Updated for the single-page redesign: routes are on-page anchors
 * (or external links flagged with external: true).
 * Add new entries here to extend contextual navigation.
 */
const CONTENT_ROUTES = [
  {
    id: 'project-gloss',
    title: 'Gloss — Chrome Extension',
    route: '#gloss',
    keywords: ['gloss', 'chrome', 'extension', 'mv3', 'manifest', 'highlight', 'shadow dom', 'sse', 'streaming', 'byok', 'web store'],
    buttonLabel: 'See How Gloss Works',
  },
  {
    id: 'project-quantanalyst',
    title: 'QuantAnalyst — AI Chart Analysis',
    route: '#projects',
    keywords: ['quantanalyst', 'quant', 'chart', 'trading', 'stock', 'technical analysis', 'vision', 'multimodal', 'json schema', 'coach', 'journal'],
    buttonLabel: 'View QuantAnalyst',
  },
  {
    id: 'project-clients',
    title: 'Freelance Client Sites',
    route: '#projects',
    keywords: ['freelance', 'client', 'clients', 'automotive', 'apparel', 'drift maps', 'driftmap', '38carmodz', 'bm wrapz', 'website', 'websites'],
    buttonLabel: 'View Client Work',
  },
  {
    id: 'projects',
    title: 'Projects',
    route: '#projects',
    keywords: ['project', 'projects', 'work', 'portfolio', 'built', 'developed', 'shipped'],
    buttonLabel: 'View All Projects',
  },
  {
    id: 'skills',
    title: 'Skills',
    route: '#skills',
    keywords: ['skill', 'skills', 'technologies', 'tech', 'stack', 'languages', 'proficient', 'expertise', 'react', 'python', 'docker', 'aws'],
    buttonLabel: 'View Skills',
  },
  {
    id: 'background',
    title: 'Experience & Education',
    route: '#history',
    keywords: ['education', 'degree', 'university', 'school', 'sjsu', 'sfsu', 'san jose', 'san francisco', 'graduate', 'graduated', 'masters', 'experience', 'career', 'background', 'about', 'who', 'bio'],
    buttonLabel: 'View Background',
  },
  {
    id: 'resume',
    title: 'Resume',
    route: 'https://drive.google.com/uc?export=download&id=1mlcJUpWWCuMGMw19UK96ByOdynHjJIrV',
    external: true,
    keywords: ['resume', 'cv', 'download', 'pdf', 'hire', 'hiring'],
    buttonLabel: 'Download Resume',
  },
  {
    id: 'contact',
    title: 'Contact',
    route: '#contact',
    keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'linkedin', 'github', 'location', 'bay area', 'hire', 'talk'],
    buttonLabel: 'Get in Touch',
  },
];

/**
 * Scores a content route against the user's question.
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
