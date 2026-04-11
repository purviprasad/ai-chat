/**
 * Backend HTTP server.
 * Loads environment variables, creates the Express app, enables CORS and JSON bodies,
 * mounts chat routes under `/api` and RAG routes under `/api/rag`, then listens on port 5001.
 */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import ragRoutes from "./routes/rag.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", chatRoutes);
app.use("/api/rag", ragRoutes);

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
