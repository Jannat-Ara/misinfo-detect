
export type QuestionType = "multiple-choice" | "true-false" | "headline-compare" | "image-hotspot";


export interface Option {
  id: string;
  text: string;
}

export interface Question {
  _id: string;
  type: QuestionType;
  prompt: string;
  options: Option[];
  image?: string;
}

export interface LessonSummary {
  _id: string;
  lessonNumber: number;
  title: string;
  summary: string;
}

export interface Lesson extends LessonSummary {
  content: string[];
  tips: string[];
  questions: Question[];
}

export interface CheckResult {
  correct: boolean;
  correctAnswer: string;
  explanation: string;
}


export interface GradedAnswer {
  questionId: string;
  prompt: string;
  selected: string;
  correct: boolean;
  correctAnswer: string;
  explanation: string;
}

export interface SubmitResult {
  playerName: string;
  lessonNumber: number;
  score: number;
  total: number;
  percentage: number;
  results: GradedAnswer[];
}

export interface PlayerScores {
  player: string;
  lessonsCompleted: number;
  totalScore: number;
  bestByLesson: Record<string, { score: number; total: number }>;
}


export interface LeaderboardRow {
  playerName: string;
  totalScore: number;
  lessonsCompleted: number;
}


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  result?: T;
  error?: unknown;
}

export interface ResultsState {
  result: SubmitResult;
  questions: Question[];
  lessonTitle: string;
  tips: string[];      
  hintsUsed: number; 
}
export interface Question {
  _id: string;
  type: QuestionType;
  prompt: string;
  options: Option[];
  hint?: string;   
  image?: string;
}

