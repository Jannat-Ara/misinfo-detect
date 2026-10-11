import { Schema, model } from "mongoose";
import type { IAttempt, IAttemptAnswer } from "../types.js";

const answerSchema = new Schema<IAttemptAnswer>(
  {
    questionId: { type: Schema.Types.ObjectId, required: true },
    selected: { type: String, required: true },
    correct: { type: Boolean, required: true },
  },
  { _id: false }
);

const attemptSchema = new Schema<IAttempt>(
  {
    playerName: { type: String, required: true, trim: true, maxlength: 30 },
    lessonNumber: { type: Number, required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    answers: [answerSchema],
  },
  { timestamps: true } // createdAt = when the quiz was taken
);

export const Attempt = model<IAttempt>("Attempt", attemptSchema);