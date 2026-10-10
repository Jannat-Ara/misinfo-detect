import mongoose from "mongoose";

// Connects to MongoDB, then runs the callback (used to start the server)
export const databaseConnection = async (callback: () => void): Promise<void> => {
  const url = process.env.DATABASE_URL;

  if (!url) {
    console.error("DATABASE_URL is not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(url);
    console.log("Database connected successfully.");
    callback();
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};