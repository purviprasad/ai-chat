/**
 * OpenAI API client singleton.
 * Requires `OPENAI_API_KEY` in the environment; never log or expose the key.
 */
import OpenAi from "openai";

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
