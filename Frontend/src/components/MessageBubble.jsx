export default function MessageBubble({ role, content }) {
    const isUser = role === "user";
    return (
        <div className={`msg-row ${isUser ? "msg-row--user" : "msg-row--assistant"}`}>
            <div className="msg-stack">
                <div className="msg-meta">{isUser ? "You" : "Assistant"}</div>
                <div className={`msg-bubble ${isUser ? "msg-bubble--user" : "msg-bubble--assistant"}`}>
                    {content}
                </div>
            </div>
        </div>
    );
}
