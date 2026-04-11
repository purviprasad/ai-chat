/**
 * In-memory vector store for RAG prototypes.
 * `MemoryVectorStore` is not persisted to disk — data is lost when the process exits.
 */
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { getEmbeddings } from "./embedding.service.js";

/**
 * Embeds documents and builds a LangChain memory vector store for similarity search.
 *
 * @param {import("@langchain/core/documents").Document[]} docs Chunked documents from `splitText`.
 * @returns {Promise<MemoryVectorStore>}
 */
export const createVectorStore = async (docs) => {
    const embeddings = getEmbeddings();
    const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
    return vectorStore;
};
