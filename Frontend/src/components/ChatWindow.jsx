import { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat.js";
import MessageBubble from "./MessageBubble";
import Loader from "./Loader";

export default function ChatWindow() {
    const { messages, send, isLoading } = useChat();
    const [input, setInput] = useState("");
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, isLoading]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || isLoading) return;
        setError(null);
        setInput("");
        try {
            await send(text);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Request failed");
        }
    };

    return (
        <div className="chat-root">
            <div className="chat-toolbar">
                <div>
                    <h2 className="chat-toolbar-title">Streaming chat</h2>
                    <p className="chat-toolbar-sub">Phase 1 · Gemini stream from your Node server</p>
                </div>
            </div>

            <div className="chat-scroll" ref={scrollRef}>
                {messages.length === 0 && !isLoading ? (
                    <div className="chat-empty">
                        <strong>No messages yet</strong>
                        <span>Send a prompt — tokens stream into the assistant bubble as they arrive.</span>
                    </div>
                ) : null}
                {messages.map((msg, i) => (
                    <MessageBubble key={i} role={msg.role} content={msg.content} />
                ))}
                {isLoading ? <Loader /> : null}
            </div>

            {error ? <p className="alert">{error}</p> : null}

            <div className="composer">
                <textarea
                    className="composer-input"
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="Message the model…"
                    disabled={isLoading}
                    aria-label="Chat message"
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
