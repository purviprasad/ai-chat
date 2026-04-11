/**
 * Retrieval-augmented answering: retrieves relevant chunks from a vector store, then asks Gemini
 * to answer strictly from that context (grounded Q&A over the uploaded PDF).
 */
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

/**
 * Retrieves top chunks for `question`, builds a grounded prompt, and returns the model’s text reply.
 *
 * @param {import("@langchain/classic/vectorstores/memory").MemoryVectorStore} vectorStore
 * @param {string} question User question.
 * @returns {Promise<string>} Model answer string (`response.content` from LangChain).
 */
export const askQuestion = async (vectorStore, question) => {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        apiKey: process.env.GEMINI_API_KEY,
    });
    const retriever = vectorStore.asRetriever();
    const docs = await retriever.invoke(question);
    const context = docs.map((doc) => doc.pageContent).join("\n");

    const prompt = `
    Answer only using the context below.
    If answer not found, say "Not in document."

    Context:
    ${context}

    Question:
    ${question}
    `;

    const response = await model.invoke(prompt);
    return response.content;
};
