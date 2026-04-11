/**
 * RAG API routes (PDF upload + question answering).
 * - POST `/upload` — multipart field `file` (single PDF in memory via multer).
 * - POST `/query` — JSON body `{ question }` against the last uploaded document’s index.
 */
import express from "express";
import multer from "multer";
import { queryPDF, uploadPDF } from "../controllers/rag.controller.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), uploadPDF);
router.post("/query", queryPDF);

export default router;
