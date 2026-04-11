/**
 * Chat HTTP handlers — streams token/text chunks to the client for low-latency UX.
 */
import { streamChatCompletion } from "../services/gemini.service.js";

/**
 * Streams a Gemini completion for `req.body.message` as plain text chunks.
 * Sets headers suitable for chunked streaming; flushes headers before the model writes.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const chatHandler = async (req, res) => {
    const { message } = req.body;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();
    await streamChatCompletion(message, res);
};
