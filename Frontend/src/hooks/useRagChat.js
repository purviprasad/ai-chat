/**
 * Hook for Phase 2 RAG chat flow.
 * Manages upload lifecycle, question/answer messages, and error/loading state.
 */
import { useState, useCallback } from "react";
import { askQuestion, uploadPDF } from "../services/rag.api";

export const useRagChat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [error, setError] = useState(null);

    const reset = useCallback(() => {
        // Clears phase-2 session so a new document can be uploaded.
        setUploaded(false);
        setMessages([]);
        setError(null);
    }, []);

    const upload = async (file) => {
        if (!file) return;
        setError(null);
        try {
            setLoading(true);
            await uploadPDF(file);
            setUploaded(true);
        } catch (err) {
            console.error("Error uploading PDF:", err);
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const send = async (question) => {
        setError(null);
        setMessages((prev) => [...prev, { role: "user", content: question }]);
        setLoading(true);
        try {
            const res = await askQuestion(question);
            setMessages((prev) => [...prev, { role: "assistant", content: res.answer }]);
        } catch (err) {
            console.error("Query failed:", err);
            setError(err instanceof Error ? err.message : "Query failed");
        } finally {
            setLoading(false);
        }
    };

    return { messages, send, upload, loading, uploaded, error, reset };
};
