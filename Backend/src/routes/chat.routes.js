/**
 * Chat API routes.
 * POST `/chat` — streams a model reply for a user message (see chat controller).
 */
import express from "express";
import { chatHandler } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/chat", chatHandler);

export default router;
