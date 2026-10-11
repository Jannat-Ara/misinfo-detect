import "dotenv/config";
import express from "express";
import cors from "cors";
import { databaseConnection } from "./config/database.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
// Routers
import lessonRouter from "./routes/lessons.js";
import attemptRouter from "./routes/attempts.js";



const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Global middleware
app.use(cors());
app.use(express.json());

// Main routers

app.use("/api/lessons", lessonRouter);
app.use("/api/attempts", attemptRouter);

// These must come AFTER all routers
app.use(notFound);
app.use(errorHandler);

// Start the server only after the database connects
databaseConnection(() => {
  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});