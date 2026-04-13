/**
 * Learning-lab layout that maps the roadmap plan into UI sections.
 * Includes:
 * - navigation between overview/phases/portfolio
 * - phase content blocks
 * - embedded live demos for Phase 1 (streaming) and Phase 2 (RAG)
 */
import UploadBox from "./UploadBox";
import RAGChatWindow from "./RAGChatWindow";
import ChatWindow from "./ChatWindow";
import { phases, portfolioSection, roadmapIntro } from "../data/learningRoadmap";

const navItems = [
    { id: "overview", label: "Overview", badge: null },
    ...phases.map((p) => ({ id: p.id, label: `Phase ${p.n}`, badge: p.weeks })),
    { id: "portfolio", label: "Portfolio", badge: "Ship" },
];

function ListBlock({ title, items }) {
    if (!items?.length) return null;
    return (
        <div className="phase-block">
            <h3 className="phase-block-title">{title}</h3>
            <ul className="phase-block-list">
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

/** Overview screen with quick access cards to each phase. */
function OverviewPanel({ onGo }) {
    return (
        <div className="overview-panel">
            <div className="phase-hero">
                <span className="phase-badge phase-badge--muted">Learning lab</span>
                <h2 className="phase-title">{roadmapIntro.headline}</h2>
                <p className="phase-lead">{roadmapIntro.profile}</p>
                <p className="phase-goal">{roadmapIntro.strategy}</p>
            </div>
            <p className="overview-hint">Jump into a phase — <strong>Phase 1</strong> and <strong>Phase 2</strong> include live demos wired to this repo.</p>
            <div className="overview-cards">
                {phases.map((p) => (
                    <button
                        key={p.id}
                        type="button"
                        className="overview-card"
                        onClick={() => onGo(p.id)}
                    >
                        <span className="overview-card-weeks">{p.weeks}</span>
                        <span className="overview-card-title">
                            Phase {p.n}: {p.title}
                        </span>
                        <span className="overview-card-goal">{p.goal}</span>
                        {p.demo ? (
                            <span className="overview-card-live">Live demo in repo</span>
                        ) : null}
                    </button>
                ))}
                <button
                    type="button"
                    className="overview-card overview-card--accent"
                    onClick={() => onGo("portfolio")}
                >
                    <span className="overview-card-weeks">{portfolioSection.weeks}</span>
                    <span className="overview-card-title">{portfolioSection.title}</span>
                    <span className="overview-card-goal">{portfolioSection.goal}</span>
                </button>
            </div>
        </div>
    );
}

/** Generic phase renderer for learn/tools/resources/build sections. */
function PhasePanel({ phase }) {
    return (
        <div className="phase-panel">
            <div className="phase-hero">
                <span className="phase-badge">{phase.weeks}</span>
                <h2 className="phase-title">
                    Phase {phase.n}: {phase.title}
                </h2>
                <p className="phase-goal">{phase.goal}</p>
                <p className="phase-time">
                    <strong>Time</strong> · {phase.time}
                </p>
            </div>
            <div className="phase-grid">
                <ListBlock title="Learn" items={phase.learn} />
                <ListBlock title="Tools" items={phase.tools} />
                <ListBlock title="Resources" items={phase.resources} />
                <ListBlock title="Concepts" items={phase.concepts} />
                <ListBlock title="Backend focus" items={phase.backend} />
                <ListBlock title="Stack" items={phase.stack} />
                <ListBlock title="Build" items={phase.build} />
            </div>
        </div>
    );
}

/** Final outcomes section used as a portfolio checklist. */
function PortfolioPanel() {
    const p = portfolioSection;
    return (
        <div className="phase-panel">
            <div className="phase-hero">
                <span className="phase-badge">{p.weeks}</span>
                <h2 className="phase-title">{p.title}</h2>
                <p className="phase-goal">{p.goal}</p>
            </div>
            <div className="portfolio-grid">
                {p.outcomes.map((o) => (
                    <div key={o.name} className="portfolio-card">
                        <h3 className="portfolio-card-title">{o.name}</h3>
                        <ul className="phase-block-list">
                            {o.bullets.map((b) => (
                                <li key={b}>{b}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Placeholder content for phases that are planned but not implemented as live demos yet. */
function PlannedDemoCallout({ phase }) {
    return (
        <div className="planned-callout">
            <h3 className="planned-callout-title">Implementation in this repo</h3>
            <p className="planned-callout-text">
                No live demo for <strong>Phase {phase.n}</strong> yet — next steps align with your build list
                below.
            </p>
            <ListBlock title="Target deliverables" items={phase.build} />
        </div>
    );
}

/** Top-level orchestrator for roadmap content + contextual live demo rendering. */
export default function LearningLayout({ activeId, onNavigate, rag }) {
    const phase = phases.find((p) => p.id === activeId);

    return (
        <div className="lab-layout">
            <nav className="lab-nav" aria-label="Learning roadmap">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className={`lab-nav-btn ${activeId === item.id ? "is-active" : ""}`}
                        onClick={() => onNavigate(item.id)}
                    >
                        <span className="lab-nav-btn-label">{item.label}</span>
                        {item.badge ? <span className="lab-nav-btn-meta">{item.badge}</span> : null}
                    </button>
                ))}
            </nav>

            <div className="lab-content">
                {activeId === "overview" ? <OverviewPanel onGo={onNavigate} /> : null}
                {phase ? <PhasePanel phase={phase} /> : null}
                {activeId === "portfolio" ? <PortfolioPanel /> : null}

                {phase?.demo === "streaming" ? (
                    <section className="lab-demo" aria-labelledby="demo-streaming-heading">
                        <div className="lab-demo-head">
                            <h3 id="demo-streaming-heading" className="lab-demo-title">
                                Live · Phase 1
                            </h3>
                            <p className="lab-demo-desc">
                                Gemini streaming via <code>POST /api/chat</code> — token chunks written as they arrive.
                            </p>
                        </div>
                        <div className="lab-demo-card">
                            <ChatWindow />
                        </div>
                    </section>
                ) : null}

                {phase?.demo === "rag" ? (
                    <section className="lab-demo" aria-labelledby="demo-rag-heading">
                        <div className="lab-demo-head">
                            <h3 id="demo-rag-heading" className="lab-demo-title">
                                Live · Phase 2
                            </h3>
                            <p className="lab-demo-desc">
                                PDF upload, chunking, embeddings, and retrieval-backed answers via{" "}
                                <code>/api/rag</code> (in-memory index in this prototype).
                            </p>
                        </div>
                        <div className="lab-demo-card lab-demo-card--rag">
                            {!rag.uploaded ? (
                                <UploadBox
                                    onUpload={rag.upload}
                                    loading={rag.loading}
                                    error={rag.error}
                                />
                            ) : (
                                <RAGChatWindow
                                    messages={rag.messages}
                                    onSend={rag.send}
                                    loading={rag.loading}
                                    disabled={rag.loading}
                                    error={rag.error}
                                    onNewDocument={rag.reset}
                                />
                            )}
                        </div>
                    </section>
                ) : null}

                {phase && !phase.demo ? <PlannedDemoCallout phase={phase} /> : null}
            </div>
        </div>
    );
}
