import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/mongo/db";

import newsRouter from "./routes/news";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Allfunds Tehcnical Test");
});

app.use("/api/news", newsRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});