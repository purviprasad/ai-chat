import "./App.css";
import UploadBox from "./components/UploadBox";
import RAGChatWindow from "./components/RAGChatWindow";
import { useRagChat } from "./hooks/useRagChat";

function App() {
    const { messages, send, upload, loading, uploaded, error, reset } = useRagChat();

    return (
        <div className="app">
            <div className="app-glow" aria-hidden />
            <header className="app-header">
                <div className="app-brand">
                    <div className="app-logo">
                        <span className="app-logo-mark" aria-hidden />
                        PDF Chat
                    </div>
                    <p className="app-tagline">
                        Upload a document, then ask grounded questions powered by your backend RAG
                        pipeline.
                    </p>
                </div>
                <span className="app-pill">RAG demo</span>
            </header>

            <main className="app-main">
                <div className="app-card">
                    <div className="app-card-inner">
                        {!uploaded ? (
                            <UploadBox onUpload={upload} loading={loading} error={error} />
                        ) : (
                            <RAGChatWindow
                                messages={messages}
                                onSend={send}
                                loading={loading}
                                disabled={loading}
                                error={error}
                                onNewDocument={reset}
                            />
                        )}
                    </div>
                </div>
            </main>

            <footer className="app-footer">
                Connects to <code>http://localhost:5001/api/rag</code> · answers use only your
                indexed PDF text
            </footer>
        </div>
    );
}

export default App;
