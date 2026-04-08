import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", chatRoutes);

app.listen(5001, ()=>{
    console.log("Server is running on port 5001");
})