import "dotenv/config";
import { readFileSync } from "fs";
import mongoose from "mongoose";
import { Lesson } from "../models/Lesson.js";

const lessons = JSON.parse(readFileSync(new URL("./lessons.json", 
    import.meta.url), "utf-8"));

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");

  await mongoose.connect(url);
  await Lesson.deleteMany({});            
  console.log(`Seeded ${lessons.length} lessons.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});