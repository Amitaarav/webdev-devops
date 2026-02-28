import express from "express";
import cors from "cors";

import codeRoutes from "./routes/codeRoute.js";
import { getSubmissions } from "./routes/submissions.js";

const app = express();

app.use(cors());
app.use(express.json());

//  API routes
app.use("/api", codeRoutes);

//  Health check
app.get("/health", (_req, res) =>
  res.json({ status: "OK", ts: new Date().toISOString() })
);

// Submissions history (last 50)
app.get("/submissions", getSubmissions);

export default app;
