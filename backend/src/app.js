import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

const app = express(); // ✅ app created FIRST

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes); // ✅ now safe to use

export default app;
