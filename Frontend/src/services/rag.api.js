/**
 * API helpers for Phase 2 RAG endpoints.
 * Handles PDF upload and question querying, with normalized error handling.
 */
const BASE_URL = "http://localhost:5001/api/rag";

async function parseJsonSafe(res) {
    try {
        return await res.json();
    } catch {
        return {};
    }
}

/**
 * Uploads a PDF file for indexing on the backend.
 */
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

/**
 * Sends a user question and returns the backend's grounded answer payload.
 */
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
