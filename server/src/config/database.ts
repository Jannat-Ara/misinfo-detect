import mongoose from "mongoose";


export const databaseConnection = async (callback: () => void): Promise<void> => {
  const url = process.env.DATABASE_URL;

  if (!url) {
    console.error("DATABASE_URL is not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(url);
    console.log("Database connected successfully.");
    console.log(`Connected to ${mongoose.connection.host} / database: ${mongoose.connection.name}`);
    callback();
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};