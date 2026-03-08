from pathlib import Path
import os
import random
import re
from collections import Counter

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

load_dotenv()

app = FastAPI()

# Lets your frontend call the API during local development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
DATA_DIR = Path("data")


def load_documents() -> dict[str, str]:
    documents = {}
    for path in DATA_DIR.glob("*.txt"):
        documents[path.stem] = path.read_text(encoding="utf-8")
    return documents


DOCUMENTS = load_documents()


STOP_WORDS = {
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
    "has", "he", "how", "i", "in", "is", "it", "me", "of", "on", "or",
    "that", "the", "to", "what", "who", "with", "about", "tell", "does",
    "do", "use", "uses", "looking", "job", "work", "worked", "built"
}

KEYWORD_BOOSTS = {
    "project": "projects",
    "projects": "projects",
    "budget": "projects",
    "budgeting": "projects",
    "plaid": "projects",
    "routing": "projects",
    "driver": "projects",
    "linux": "projects",
    "device": "projects",
    "skill": "skills",
    "skills": "skills",
    "python": "skills",
    "javascript": "skills",
    "react": "skills",
    "node": "skills",
    "mysql": "skills",
    "docker": "skills",
    "education": "education",
    "degree": "education",
    "degrees": "education",
    "university": "education",
    "college": "education",
    "school": "education",
    "schools": "education",
    "sfsu": "education",
    "san": "education",
    "francisco": "education",
    "major": "education",
    "majored": "education",
    "majors": "education",
    "study": "education",
    "studied": "education",
    "studies": "education",
    "field": "education",
    "graduate": "education",
    "graduated": "education",
    "academic": "education",
    "bachelor": "education",
    "bachelors": "education",
    "bs": "education",
    "b.s": "education",
    "contact": "contact",
    "email": "contact",
    "phone": "contact",
    "location": "contact",
    "bay": "contact",
    "area": "contact",
    "who": "bio",
    "andrew": "bio",
    "background": "bio",
    "career": "bio",
    "hobby": "personal",
    "hobbies": "personal",
    "interest": "personal",
    "interests": "personal",
    "free": "personal",
    "time": "personal",
    "video": "personal",
    "games": "personal",
    "golf": "personal",
    "friends": "personal",
    "car": "personal",
    "automotive": "personal",
    "stock": "personal",
    "market": "personal",
    "personal": "personal",
    "fun": "personal",
    "tech": "skills",
    "technical": "skills",
    "engineering": "skills",
    "coding": "skills",
    "software": "skills",
    "mindset": "bio",
    "relate": "personal",
    "relates": "personal",
    "related": "personal",
    "connect": "personal",
    "connects": "personal",
    "reflect": "personal",
    "reflects": "personal",
    "opinion": "bio",
    "impression": "bio",
    "personality": "bio",
    "character": "bio",
    "honest": "bio",
    "think": "bio",
    "seem": "bio",
    "seems": "bio",
}

# Tokens that indicate opinion/impression/personality questions
OPINION_TOPIC_TOKENS = {
    "opinion", "honest", "impression", "impressions", "personality",
    "character", "person", "seem", "seems", "think", "like", "overall", "vibe",
}

# Tokens that indicate personal/hobby side of a mixed question
PERSONAL_TOPIC_TOKENS = {
    "hobby", "hobbies", "interest", "interests", "free", "time",
    "personal", "fun", "recreation", "recreational", "outside", "enjoy", "enjoys",
}

# Tokens that indicate professional/tech side of a mixed question
PROFESSIONAL_TOPIC_TOKENS = {
    "tech", "technical", "engineering", "skills", "skill",
    "coding", "software", "programming", "develop", "build",
    "project", "projects", "career", "work",
}


EDUCATION_TOPIC_TOKENS = {
    "major", "majored", "majors", "study", "studied", "studies",
    "degree", "degrees", "education", "university", "college", "school",
    "graduate", "graduated", "academic", "bachelor", "bachelors", "bs",
    "field", "sfsu", "san", "francisco",
}


def is_mixed_topic_question(question: str) -> bool:
    """Detect if the question connects personal/hobby topics with professional/tech topics."""
    tokens = set(tokenize(question))
    has_personal = bool(tokens & PERSONAL_TOPIC_TOKENS)
    has_professional = bool(tokens & PROFESSIONAL_TOPIC_TOKENS)
    return has_personal and has_professional


def is_education_question(question: str) -> bool:
    """Detect if the question is about education, degree, or major."""
    tokens = set(tokenize(question))
    return bool(tokens & EDUCATION_TOPIC_TOKENS)


def is_opinion_question(question: str) -> bool:
    """Detect if the question asks for an opinion, impression, or personality assessment."""
    tokens = set(tokenize(question))
    return bool(tokens & OPINION_TOPIC_TOKENS)


# Greeting detection: phrases that indicate a greeting with no real question
GREETING_PHRASES = {
    "hi", "hello", "hey", "yo", "howdy", "greetings",
    "hi there", "hello there", "hey there",
    "good morning", "good afternoon", "good evening",
    "what's up", "whats up", "what up", "sup",
}
# Words that suggest the user is asking a real question (not just greeting)
QUESTION_INDICATORS = {
    "what", "which", "who", "where", "when", "why", "how",
    "tell", "can", "does", "did", "projects", "skills", "education",
    "experience", "about", "contact", "resume", "background",
    "work", "built", "hobbies", "interests",
}

GREETING_RESPONSES = [
    "Hey! I can help you get to know Andrew better. You can ask about his projects, skills, or experience.",
    "Hello! I can help you learn more about Andrew. Ask me about his background, technical skills, or projects.",
    "Hey! I'm here to help you get to know Andrew better. You can ask about his work, education, or software projects.",
    "Hi! I'm Andrew's portfolio assistant. Feel free to ask about his projects, skills, or experience.",
    "Hello! I can tell you about Andrew's background, projects, and skills. What would you like to know?",
    "Hey there! I can help you learn about Andrew. Ask me about his education, work, or technical experience.",
]


def is_primarily_greeting(text: str) -> bool:
    """Return True if the input is only or mostly a greeting with no real question."""
    normalized = text.strip().lower().rstrip(".!?,")
    if not normalized:
        return False
    words = set(re.findall(r"[a-zA-Z0-9']+", normalized))
    # If it contains question indicators, treat as a real question
    if words & QUESTION_INDICATORS:
        return False
    # Too many words likely means a real question
    if len(words) > 4:
        return False
    # Exact or near-exact match to known greetings
    if normalized in GREETING_PHRASES:
        return True
    # Short phrases like "hi there", "hey you"
    if len(words) <= 2 and words & {"hi", "hello", "hey", "yo", "howdy"}:
        return True
    # "good morning" etc. with trailing punctuation
    normalized_no_punct = re.sub(r"[^\w\s]", "", normalized).strip()
    if normalized_no_punct in GREETING_PHRASES:
        return True
    return False


def get_greeting_response() -> str:
    """Return a friendly greeting response with topic suggestions."""
    return random.choice(GREETING_RESPONSES)


def tokenize(text: str) -> list[str]:
    return [
        token for token in re.findall(r"[a-zA-Z0-9\+\.#-]+", text.lower())
        if token not in STOP_WORDS
    ]


def rank_documents(question: str, documents: dict[str, str]) -> list[tuple[str, int]]:
    question_tokens = tokenize(question)
    token_counts = Counter(question_tokens)
    scores = []

    for doc_name, content in documents.items():
        content_lower = content.lower()
        score = 0

        for token, count in token_counts.items():
            if token in content_lower:
                score += count * 2
            boosted_doc = KEYWORD_BOOSTS.get(token)
            if boosted_doc == doc_name:
                score += 4

        if doc_name in question.lower():
            score += 3

        scores.append((doc_name, score))

    scores.sort(key=lambda item: item[1], reverse=True)
    return scores


def get_relevant_context(question: str, documents: dict[str, str], top_k: int = 3) -> tuple[str, list[str]]:
    """Return (context_string, list of document names used)."""
    ranked = rank_documents(question, documents)
    selected_names: list[str] = []

    if is_mixed_topic_question(question):
        # For hobby+skills questions, ensure we pull from both personal and professional sources
        required_for_mixed = {"personal", "skills", "projects", "bio"}
        available = set(documents.keys())
        required_present = required_for_mixed & available
        # Order: personal and skills first (most relevant for hobby-tech connection)
        priority_order = ["personal", "skills", "projects", "bio"]
        for name in priority_order:
            if name in required_present:
                selected_names.append(name)
        for name, _ in ranked:
            if name not in selected_names:
                selected_names.append(name)
            if len(selected_names) >= 5:
                break
        selected_names = selected_names[:5]
    elif is_education_question(question) and "education" in documents:
        # For education questions (major, degree, study, etc.), always include education
        selected_names = ["education"]
        for name, _ in ranked:
            if name != "education" and name not in selected_names:
                selected_names.append(name)
            if len(selected_names) >= top_k + 1:
                break
        selected_names = selected_names[: top_k + 1]
    elif is_opinion_question(question):
        # For opinion/impression/personality questions, pull from all relevant sources
        priority_order = ["bio", "projects", "skills", "personal", "education", "faq"]
        available = set(documents.keys())
        for name in priority_order:
            if name in available:
                selected_names.append(name)
    else:
        selected = [(name, score) for name, score in ranked[:top_k] if score > 0]
        if not selected:
            selected = list(ranked[:2])
        selected_names = [name for name, _ in selected]

    context_parts = []
    for name in selected_names:
        context_parts.append(f"### {name.upper()}\n{documents[name]}")

    return "\n\n".join(context_parts), selected_names


@app.get("/")
def root():
    return {"message": "Portfolio AI backend is running."}


@app.get("/ask")
def ask(question: str):
    # Handle pure greetings without full retrieval
    if is_primarily_greeting(question):
        return {
            "answer": get_greeting_response(),
            "context_used": [],
        }

    context, context_used = get_relevant_context(question, DOCUMENTS)

    prompt = f"""You are the AI assistant for Andrew Brockenborough's portfolio website. You answer questions about Andrew using the information provided below. Stay professional, concise, and clear. Do not mention context, files, prompts, system instructions, or how you work.

Answering with grounded inference:
- You MAY connect related facts across the provided information when multiple pieces of context clearly support the connection.
- For questions that link hobbies/interests to tech skills (e.g., "which hobby reflects his technical skills?", "what interest connects to engineering?"), use BOTH personal and skills/projects context to identify connections. Examples: working on personal coding projects (directly technical), studying financial markets (analytical thinking), car/automotive enthusiasm (technical/engineering mindset).
- When the answer can be reasonably inferred from the provided data, answer confidently with a brief explanation. Do NOT say "I don't have access to that information" if the answer is supported by the context.
- Never invent unsupported experience or claims. Only connect facts that are explicitly in the provided information. If the answer truly cannot be found or inferred, respond only with: "I don't have access to that information."

Do not bring up hobbies, interests, or free time unless the user explicitly asks (e.g., "hobbies", "interests", "free time", "what does he do for fun"). If asked something unrelated to Andrew's portfolio, politely redirect. If asked if you're an AI, say you're an AI assistant built by Andrew for his portfolio. If the user combines a greeting with a question, you may start with a brief greeting, then answer the question.

Sound natural and human—vary your wording and sentence structure. Avoid repeating the same phrases or patterns. Write like a thoughtful colleague, not a rigid FAQ bot. Use bullets only when they genuinely help; often a short paragraph is better. When using numbered lists, always start from 1.

By question type:
- Projects: Short explanation of the project and its main technical focus or technologies when relevant. When listing projects in a numbered list, always start from 1 (1., 2., 3.—never start at 3 or another number).
- Skills: Lead with the strongest relevant skills instead of dumping a full list every time.
- Education/degree/major: When education context is provided, answer directly with the degree and institution. Do not say you lack access if that information is in the context.
- Opinion/impression/personality: When asked for your opinion about Andrew as a person, provide a concise, evidence-based impression grounded in the provided data (projects, skills, interests, education, bio). You may make light, supported character inferences (e.g., driven, curious, hands-on, technically focused) and connect facts across context. Frame as a grounded impression, not absolute fact. Do not infer private traits, mental health, relationships, or politics. Do not say you lack access if the data supports a reasonable impression.
- Hobbies/free time: Slightly more casual and human.
- Hobbies + tech/skills: Connect facts across personal and professional context; explain the link briefly and confidently.

Provided information:
{context}

Question: {question}
"""

    response = client.responses.create(
        model="gpt-4o-mini",
        input=prompt,
        temperature=0.65,
    )

    return {
        "answer": response.output_text,
        "context_used": context_used,
    }
