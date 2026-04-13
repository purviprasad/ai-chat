/**
 * Phase 2 RAG chat panel.
 * Shows conversation grounded to uploaded PDF content and composer for follow-up questions.
 */
import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import Loader from "./Loader";

export default function RAGChatWindow({
    messages,
    onSend,
    loading,
    disabled,
    error,
    onNewDocument,
}) {
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;
        // Auto-scroll when new messages are appended or loading state changes.
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, loading]);

    const handleSend = () => {
        if (!input.trim() || loading) return;
        onSend(input.trim());
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-root">
            <div className="chat-toolbar">
                <div>
                    <h2 className="chat-toolbar-title">Chat with your PDF</h2>
                    <p className="chat-toolbar-sub">Answers are limited to the uploaded document.</p>
                </div>
                <button type="button" className="btn btn-ghost" onClick={onNewDocument}>
                    New document
                </button>
            </div>

            <div className="chat-scroll" ref={scrollRef}>
                {messages.length === 0 && !loading ? (
                    <div className="chat-empty">
                        <strong>No messages yet</strong>
                        <span>Ask a question about facts, definitions, or sections in your PDF.</span>
                    </div>
                ) : null}
                {messages.map((msg, i) => (
                    <MessageBubble key={i} role={msg.role} content={msg.content} />
                ))}
                {loading ? <Loader /> : null}
            </div>

            {error ? <p className="alert">{error}</p> : null}

            <div className="composer">
                <textarea
                    className="composer-input"
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask something about the PDF…"
                    disabled={disabled}
                    aria-label="Message"
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSend}
                    disabled={loading || disabled || !input.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
