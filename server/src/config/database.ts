import mongoose from "mongoose";
let connection: Promise<typeof mongoose> | null = null;

export function connectDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  if (!connection) {
    connection = mongoose.connect(url).catch((err) => {
      connection = null;
      throw err;
    });
  }
  return connection;
}