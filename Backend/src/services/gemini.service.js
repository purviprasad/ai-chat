/**
 * Streaming chat completions using the Google Generative AI SDK (`genAI` from config).
 * Writes incremental text to the HTTP response for the `/api/chat` stream endpoint.
 */
import { genAI } from "../config/gemini.config.js";

/**
 * Streams Gemini output for a single user turn into `res` until the stream ends, then `res.end()`.
 *
 * @param {string} message User message text.
 * @param {import("express").Response} res Express response (already configured for streaming).
 */
export const streamChatCompletion = async (message, res) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
    });
    const result = await model.generateContentStream({
        contents: [
            {
                role: "user",
                parts: [{ text: message }],
            },
        ],
    });
    for await (const chunk of result.stream) {
        const text = chunk.text();
        res.write(text);
    }

    res.end();
};
