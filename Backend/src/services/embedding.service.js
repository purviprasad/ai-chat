/**
 * Embedding model factory for LangChain vector stores.
 * Uses Google Generative AI embeddings; `GEMINI_API_KEY` must be set in the environment.
 */
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

/**
 * @returns {GoogleGenerativeAIEmbeddings} LangChain embeddings client (Gemini embedding model).
 */
export const getEmbeddings = () => {
    return new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "gemini-embedding-2-preview",
    });
};
