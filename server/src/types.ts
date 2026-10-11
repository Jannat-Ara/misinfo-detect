import type { Types } from "mongoose";

export type QuestionType = "multiple-choice" | "true-false" | "headline-compare" | "image-hotspot";

export interface IOption {
  id: string;
  text: string;
}

export interface IQuestion {
  _id?: Types.ObjectId;     // added by MongoDB for each question
  type: QuestionType;
  prompt: string;
  options: IOption[];
  correctAnswer: string;
  explanation: string;
  image?: string;
}

export interface ILesson {
  lessonNumber: number;
  title: string;
  summary: string;
  content: string[];
  tips: string[];
  questions: IQuestion[];
}

// One answer inside a saved attempt
export interface IAttemptAnswer {
  questionId: Types.ObjectId;
  selected: string;
  correct: boolean;
}

// One completed quiz
export interface IAttempt {
  playerName: string;
  lessonNumber: number;
  score: number;
  total: number;
  answers: IAttemptAnswer[];
}