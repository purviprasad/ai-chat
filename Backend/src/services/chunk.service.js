/**
 * Text chunking for RAG — splits long PDF text into overlapping segments for embedding and retrieval.
 * Uses LangChain’s recursive splitter so boundaries prefer paragraphs/sentences when possible.
 */
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

/**
 * @param {string} text Full document text from PDF extraction.
 * @returns {Promise<import("@langchain/core/documents").Document[]>} LangChain documents (one per chunk).
 */
export const splitText = async (text) => {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    return await splitter.createDocuments([text]);
};
