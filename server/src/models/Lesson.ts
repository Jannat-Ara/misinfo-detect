import { Schema, model } from "mongoose";
import type { ILesson, IQuestion } from "../types.js";

const questionSchema = new Schema<IQuestion>({
  type: {
    type: String,
    enum: ["multiple-choice", "true-false", "headline-compare", "image-hotspot"],
    required: true,
  },
  prompt: { type: String, required: true },
  options: [{ id: String, text: String, _id: false }],
  correctAnswer: { type: String, required: true, select: false },
  explanation: { type: String, required: true, select: false },
  image: String,
});

const lessonSchema = new Schema<ILesson>(
  {
    lessonNumber: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: [String],
    tips: [String],
    questions: [questionSchema],
  },
  { timestamps: true }
);

export const Lesson = model<ILesson>("Lesson", lessonSchema);