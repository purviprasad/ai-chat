export const sendMessage = async (message, onChunk) => {
    const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    });
    if (!response.ok) {
        const errText = await response.text().catch(() => "");
        throw new Error(errText || `Chat failed (${response.status})`);
    }
    if (!response.body) {
        throw new Error("No response body");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        onChunk(chunk);
    }
    reader.cancel();
};