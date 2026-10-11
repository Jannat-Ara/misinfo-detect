import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
// Routers
import lessonRouter from "./routes/lessons.js";
import attemptRouter from "./routes/attempts.js";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Make sure the database is connected before any route runs
app.use(async (_req, _res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (err) {
    next(err);
  }
});

// Main routers
app.use("/api/lessons", lessonRouter);
app.use("/api/attempts", attemptRouter);

// These must come AFTER all routers
app.use(notFound);
app.use(errorHandler);

export default app;