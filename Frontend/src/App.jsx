/**
 * App shell for the AI learning lab UI.
 * Holds the active roadmap section and shared RAG chat state.
 */
import { useState } from "react";
import "./App.css";
import LearningLayout from "./components/LearningLayout";
import { useRagChat } from "./hooks/useRagChat";

function App() {
    // Controls which section/phase is visible in the roadmap workspace.
    const [activeSection, setActiveSection] = useState("overview");
    // Shared RAG state is kept here so it survives navigation between phases.
    const rag = useRagChat();

    return (
        <div className="app">
            <div className="app-glow" aria-hidden />
            <header className="app-header">
                <div className="app-brand">
                    <p className="app-eyebrow">Learning build · MERN → AI integrations</p>
                    <div className="app-logo">
                        <span className="app-logo-mark" aria-hidden />
                        AIChat lab
                    </div>
                    
                </div>
                <div className="app-pill">Hands-on</div>
                
            </header>
            <p className="app-tagline">
                        One UI for a 12–16 week roadmap: each phase explains what to learn and what to
                        ship. Phase 1 (streaming) and Phase 2 (RAG) run against your local Node server.
                    </p>

            <main className="app-main">
                <div className="app-card">
                    <div className="app-card-inner">
                        <LearningLayout
                            activeId={activeSection}
                            onNavigate={setActiveSection}
                            rag={rag}
                        />
                    </div>
                </div>
            </main>

            <footer className="app-footer">
                Backend: <code>http://localhost:5001/api/chat</code> (stream) ·{" "}
                <code>/api/rag</code> (PDF Q&amp;A)
            </footer>
        </div>
    );
}

export default App;
