/**
 * RAG controllers: ingest a PDF into an in-memory vector index, then answer questions from it.
 *
 * The vector store lives in module scope — one index per server process, reset on restart;
 * not suitable for multi-tenant production without persistence and isolation.
 */
import { splitText } from "../services/chunk.service.js";
import { parsePDF } from "../services/pdf.service.js";
import { askQuestion } from "../services/rag.service.js";
import { createVectorStore } from "../services/vector.service.js";

/** @type {import("@langchain/classic/vectorstores/memory").MemoryVectorStore | null} */
let vectorStore = null;

/**
 * Parses `req.file.buffer` as PDF, chunks text, embeds into `MemoryVectorStore`, replaces `vectorStore`.
 * Expects multer `single("file")` so `req.file` is set.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const uploadPDF = async (req, res) => {
    try {
        const text = await parsePDF(req.file.buffer);
        const docs = await splitText(text);

        vectorStore = await createVectorStore(docs);

        res.json({ message: "PDF uploaded successfully" });
    } catch (error) {
        console.error("Error uploading PDF:", error);
        res.status(500).json({ error: "Failed to process PDF" });
    }
};

/**
 * Answers `req.body.question` using retrieval over the current `vectorStore`.
 * Responds 400 if no PDF has been uploaded yet in this process.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const queryPDF = async (req, res) => {
    try {
        if (!vectorStore) return res.status(400).json({ error: "Upload a PDF first" });

        const { question } = req.body;
        const answer = await askQuestion(vectorStore, question);

        res.json({ answer });
    } catch (err) {
        console.error("Query Failed:", err);
        res.status(500).json({ error: "Query Failed!" });
    }
};
