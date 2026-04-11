/**
 * Google Generative AI (Gemini) client singleton for the official `@google/generative-ai` SDK.
 * Requires `GEMINI_API_KEY` in the environment; never log or expose the key.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
