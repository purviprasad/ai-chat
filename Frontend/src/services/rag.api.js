const BASE_URL = "http://localhost:5001/api/rag";

async function parseJsonSafe(res) {
    try {
        return await res.json();
    } catch {
        return {};
    }
}

export const uploadPDF = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
    });
    const body = await parseJsonSafe(res);
    if (!res.ok) {
        throw new Error(body.error || `Upload failed (${res.status})`);
    }
    return body;
};

export const askQuestion = async (question) => {
    const res = await fetch(`${BASE_URL}/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
    });
    const body = await parseJsonSafe(res);
    if (!res.ok) {
        throw new Error(body.error || `Request failed (${res.status})`);
    }
    return body;
};
