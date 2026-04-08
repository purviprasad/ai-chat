import {streamChatCompletion} from "../services/gemini.service.js";

export const chatHandler = async (req, res) => {
    const {message} = req.body;
    res.setHeader("Content-Text", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();
    await streamChatCompletion(message, res);
}