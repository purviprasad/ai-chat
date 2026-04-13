/**
 * 12–16 week AI-integration roadmap data used by the learning lab UI.
 * Kept as plain objects so content can be rendered by reusable phase components.
 */

export const roadmapIntro = {
    headline: "AI-enabled full stack · 12–16 weeks",
    profile: "MERN (~5.5 yrs), strong architecture — not learning AI from scratch.",
    strategy:
        "Focus on how to integrate AI into real production systems: APIs, context, vectors, UX, deploy, and agents.",
};

export const phases = [
    {
        id: "phase-1",
        n: 1,
        title: "LLM foundations",
        weeks: "Week 1–2",
        goal: "See how LLM apps work in practice (not theory-heavy).",
        learn: [
            "OpenAI APIs (chat, embeddings)",
            "Prompt engineering for real products",
            "Basic streaming responses",
        ],
        tools: ["OpenAI API", "Postman"],
        resources: ["OpenAI docs", "Prompt Engineering Guide (free)"],
        build: ["Chat-style UI + Node backend", "Streaming tokens end-to-end"],
        time: "2–3 hrs/day × 10–12 days",
        demo: "streaming",
    },
    {
        id: "phase-2",
        n: 2,
        title: "LLM frameworks + RAG",
        weeks: "Week 3–5",
        goal: "Context-aware apps: chunk, embed, retrieve, answer.",
        learn: ["LangChain / LangChain.js", "LlamaIndex (optional parallel)", "RAG patterns"],
        concepts: ["Chunking", "Embeddings", "Semantic search"],
        resources: ["LangChain JS docs", 'YouTube: "RAG explained simply"'],
        build: ["Chat with PDF / docs", "Upload → index → grounded Q&A", "Stretch: conversation memory"],
        time: "~3 weeks (core block)",
        demo: "rag",
    },
    {
        id: "phase-3",
        n: 3,
        title: "Vector DB + AI backend",
        weeks: "Week 6–8",
        goal: "Production-shaped AI backend: durable vectors, APIs, guardrails.",
        learn: ["Pinecone / Weaviate (or similar)", "Embeddings pipelines", "Hybrid search (keyword + semantic)"],
        backend: ["API design for AI workloads", "Rate limiting", "Cost controls"],
        build: ["Persist embeddings in a vector DB", "Multi-user / multi-tenant sketch", "Search across documents"],
        time: "~3 weeks",
        demo: null,
    },
    {
        id: "phase-4",
        n: 4,
        title: "AI UX + real-time",
        weeks: "Week 9–10",
        goal: "Product-feel: streaming UI, feedback, control.",
        learn: ["Token-by-token rendering", "Optimistic UI", "SSE / WebSockets where needed"],
        stack: ["React (you already have the foundation)"],
        build: ["Polished chat UI", "Typing / streaming affordances", "Regenerate · edit prompt (bonus)"],
        time: "~2 weeks",
        demo: null,
    },
    {
        id: "phase-5",
        n: 5,
        title: "Deployment + scale",
        weeks: "Week 11–13",
        goal: "Ship it: containers, cloud, observability.",
        learn: ["Docker", "Kubernetes (basics)", "AWS Lambda / EC2", "S3", "Redis caching"],
        build: ["Deploy Node backend + React frontend", "Wire DB + vector store", "Logging, errors, monitoring"],
        time: "~3 weeks",
        demo: null,
    },
    {
        id: "phase-6",
        n: 6,
        title: "Agents + advanced",
        weeks: "Week 14–16",
        goal: "Differentiate: multi-step reasoning, tools, real workflows.",
        learn: ["Agents", "Tool / function calling", "LangGraph (or similar)"],
        build: ["Domain assistant (e.g. finance)", "Analyze → suggest → answer with tools"],
        time: "~3 weeks",
        demo: null,
    },
];

export const portfolioSection = {
    id: "portfolio",
    title: "Final portfolio",
    weeks: "Ongoing",
    goal: "Three shippable narratives recruiters understand in seconds.",
    outcomes: [
        { name: "AI chat app", bullets: ["Streaming", "Memory"] },
        { name: "RAG system", bullets: ["Chat with docs", "Vector DB in later phase"] },
        { name: "AI product", bullets: ["Real use case", "e.g. upgraded internal / side project"] },
    ],
};
