# abrockenborough.dev

Personal portfolio — but the site itself is a project. Instead of static pages, visitors can ask a built-in AI agent about my background, and it answers grounded in my actual resume and project docs.

**Live:** [abrockenborough.dev](https://abrockenborough.dev)

## How it's built

Two pieces, deliberately decoupled:

**Frontend** — hand-rolled HTML/CSS/JS, no framework. Includes a scroll-driven walkthrough of my latest build ([Anode](https://andrewb-03.github.io/anode/), a browser-based battery test data analyzer), an interactive terminal for the ask-agent, and tabbed skills/projects sections. All animation is vanilla JS on scroll and intersection observers.

**Backend** — a FastAPI service hosted on Render that powers the ask-agent. It loads my resume and project documentation from `data/`, grounds an LLM (OpenAI API) in that content, and serves answers over a REST endpoint. Answers include contextual navigation — the agent can scroll you to the relevant section of the site.

```
├── index.html            # main page (inline styles + scroll logic)
├── script.js             # site behavior: terminal, scrolly, tabs, counters
├── js/
│   ├── api-config.js     # backend endpoint config
│   └── content-routes.js # contextual navigation targets
├── data/                 # grounding docs for the ask-agent (bio, projects, skills…)
├── main.py               # FastAPI backend (RAG-style grounding + chat endpoint)
└── projects/             # coursework and project source
```

## Run it locally

Frontend is static — open `index.html` or serve the folder.

Backend:

```bash
pip install -r requirements.txt
echo "OPENAI_API_KEY=sk-..." > .env
uvicorn main:app --reload
```

Point `js/api-config.js` at `http://localhost:8000` and the terminal talks to your local backend.

## Projects featured

- **Anode** — battery test data analyzer: statistical anomaly detection + AI engineering summaries, fully client-side ([live](https://andrewb-03.github.io/anode/))
- **Gloss** — browser extension explaining highlighted text via streaming LLM calls
- **QuantAnalyst** — AI chart analysis: screenshot → structured technical read with probability-weighted scenarios
- **Freelance client sites** — production work for automotive and apparel businesses

---

Andrew Brockenborough · [abrockenborough.dev](https://abrockenborough.dev) · [github.com/andrewb-03](https://github.com/andrewb-03)
