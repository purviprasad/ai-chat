/**
 * OpenAI chat completions with streaming — optional path for streaming via OpenAI instead of Gemini.
 * Writes token deltas to `res` until the stream completes, then `res.end()`.
 */
import openai from "../config/openai.config.js";

/**
 * @param {string} messages User message (single string turned into one user message for the API).
 * @param {import("express").Response} res Express response (caller should set streaming headers).
 */
export const streamChatCompletion = async (messages, res) => {
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: messages }],
        stream: true,
    });

    for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content || "";
        res.write(token);
    }

    res.end();
};
