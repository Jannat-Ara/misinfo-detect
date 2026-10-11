import type { RequestHandler } from "express";
import mongoose from "mongoose";
import { Lesson } from "../models/Lesson.js";
import { sendResponse } from "../common/sendResponse.js";
import { getLessonNumber } from "../common/getLessonNumber.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { Attempt } from "../models/Attempt.js";
// Answer fields are select:false in the schema; these routes opt back in
const WITH_ANSWERS = "+questions.correctAnswer +questions.explanation";

// Question fields that may be changed through the API
const QUESTION_FIELDS = ["type", "prompt", "options", "correctAnswer", "explanation", "image"];

/* ==================== Read (used by the quiz pages) ==================== */

// GET /api/lessons: list for the lesson map 
export const getAllLessons: RequestHandler = async (_req, res) => {
  const lessons = await Lesson.find()
    .select("lessonNumber title summary content tips questions")
    .sort({ lessonNumber: 1 });
  sendResponse(res, HTTP_STATUS.OK, "Lessons fetched.", lessons);
};

// GET /api/lessons/:number: one lesson for students 
export const getLessonByNumber: RequestHandler = async (req, res) => {
  const lessonNumber = getLessonNumber(req, res);
  if (lessonNumber === null) return;

  const lesson = await Lesson.findOne({ lessonNumber });
  if (!lesson) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, `Lesson ${lessonNumber} not found.`);
    return;
  }
  sendResponse(res, HTTP_STATUS.OK, "Lesson fetched.", lesson);
};

// GET /api/lessons/:number/full: one lesson including answers 
export const getLessonWithAnswers: RequestHandler = async (req, res) => {
  const lessonNumber = getLessonNumber(req, res);
  if (lessonNumber === null) return;

  const lesson = await Lesson.findOne({ lessonNumber }).select(WITH_ANSWERS);
  if (!lesson) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, `Lesson ${lessonNumber} not found.`);
    return;
  }
  sendResponse(res, HTTP_STATUS.OK, "Lesson fetched with answers.", lesson);
};

/* ==================== Lesson create / update / delete ==================== */

// POST /api/lessons
export const createLesson: RequestHandler = async (req, res) => {
  if (!req.body) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Request body is required.");
    return;
  }
  const lesson = await Lesson.create(req.body);
  sendResponse(res, HTTP_STATUS.CREATED, "Lesson created.", lesson);
};

// PATCH /api/lessons/:number: update only the fields sent
export const updateLesson: RequestHandler = async (req, res) => {
  const lessonNumber = getLessonNumber(req, res);
  if (lessonNumber === null) return;

  const lesson = await Lesson.findOneAndUpdate({ lessonNumber }, req.body ?? {}, {
    new: true,          
    runValidators: true,  
  }).select(WITH_ANSWERS);

  if (!lesson) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, `Lesson ${lessonNumber} not found.`);
    return;
  }
  sendResponse(res, HTTP_STATUS.OK, "Lesson updated.", lesson);
};

// DELETE /api/lessons/:number
export const deleteLesson: RequestHandler = async (req, res) => {
  const lessonNumber = getLessonNumber(req, res);
  if (lessonNumber === null) return;

  const lesson = await Lesson.findOneAndDelete({ lessonNumber });
  if (!lesson) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, `Lesson ${lessonNumber} not found.`);
    return;
  }
  sendResponse(res, HTTP_STATUS.OK, `Lesson ${lessonNumber} deleted.`);
};

/* ==================== Question create / update / delete ==================== */

// POST /api/lessons/:number/questions
export const addQuestion: RequestHandler = async (req, res) => {
  const lessonNumber = getLessonNumber(req, res);
  if (lessonNumber === null) return;

  const lesson = await Lesson.findOneAndUpdate(
    { lessonNumber },
    { $push: { questions: req.body } },
    { new: true, runValidators: true }
  ).select(WITH_ANSWERS);

  if (!lesson) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, `Lesson ${lessonNumber} not found.`);
    return;
  }
  sendResponse(res, HTTP_STATUS.CREATED, "Question added.", lesson.questions.at(-1));
};

// PATCH /api/lessons/:number/questions/:questionId
export const updateQuestion: RequestHandler = async (req, res) => {
  const lessonNumber = getLessonNumber(req, res);
  if (lessonNumber === null) return;

  const { questionId } = req.params;
  if (!mongoose.isValidObjectId(questionId)) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Invalid question id.");
    return;
  }

  // Build { "questions.$.prompt": ..., ... } from allowed fields only
  const updates: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(req.body ?? {})) {
    if (QUESTION_FIELDS.includes(key)) updates[`questions.$.${key}`] = value;
  }
  if (Object.keys(updates).length === 0) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "No valid question fields to update.");
    return;
  }

  // "questions.$" refers to the array item matched by "questions._id"
  const lesson = await Lesson.findOneAndUpdate(
    { lessonNumber, "questions._id": questionId },
    { $set: updates },
    { new: true, runValidators: true }
  ).select(WITH_ANSWERS);

  if (!lesson) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, "Lesson or question not found.");
    return;
  }
  sendResponse(res, HTTP_STATUS.OK, "Question updated.", lesson);
};

// DELETE /api/lessons/:number/questions/:questionId
export const deleteQuestion: RequestHandler = async (req, res) => {
  const lessonNumber = getLessonNumber(req, res);
  if (lessonNumber === null) return;

  const { questionId } = req.params;
  if (!mongoose.isValidObjectId(questionId)) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Invalid question id.");
    return;
  }

  // Only matches if the question exists in this lesson
  const lesson = await Lesson.findOneAndUpdate(
    { lessonNumber, "questions._id": questionId },
    { $pull: { questions: { _id: questionId } } },
    { new: true }
  );

  if (!lesson) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, "Lesson or question not found.");
    return;
  }
  sendResponse(res, HTTP_STATUS.OK, "Question deleted.");
};

export const checkAnswer: RequestHandler = async (req, res) => {
  const lessonNumber = getLessonNumber(req, res);
  if (lessonNumber === null) return;

  const { questionId } = req.params;
  const selected = req.body?.selected;
  if (!mongoose.isValidObjectId(questionId) || typeof selected !== "string") {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "A valid question id and 'selected' are required.");
    return;
  }

  const lesson = await Lesson.findOne({ lessonNumber }).select(WITH_ANSWERS);
  const question = lesson?.questions.find((q) => q._id?.toString() === questionId);
  if (!question) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, "Lesson or question not found.");
    return;
  }

  sendResponse(res, HTTP_STATUS.OK, "Answer checked.", {
    correct: selected === question.correctAnswer,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
  });
};

// POST /api/lessons/:number/submit
// Body: { "playerName": "Raya", "answers": [{ "questionId": "...", "selected": "b" }] }
// Grades the whole quiz on the server, saves the attempt, and returns the score
export const submitQuiz: RequestHandler = async (req, res) => {
  const lessonNumber = getLessonNumber(req, res);
  if (lessonNumber === null) return;

  const playerName = String(req.body?.playerName ?? "").trim();
  const answers: unknown = req.body?.answers;
  if (!playerName) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "playerName is required.");
    return;
  }
  if (!Array.isArray(answers)) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "answers must be an array.");
    return;
  }

  const lesson = await Lesson.findOne({ lessonNumber }).select(WITH_ANSWERS);
  if (!lesson) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, `Lesson ${lessonNumber} not found.`);
    return;
  }

  // Look up the player's answer for each question id
  const selectedById = new Map<string, string>();
  for (const a of answers) {
    if (a && typeof a.questionId === "string" && typeof a.selected === "string") {
      selectedById.set(a.questionId, a.selected);
    }
  }

  // Grade every question in the lesson; an unanswered question counts as wrong
  const results = lesson.questions.map((q) => {
    const id = q._id!.toString();
    const selected = selectedById.get(id) ?? "";
    return {
      questionId: id,
      prompt: q.prompt,
      selected,
      correct: selected === q.correctAnswer,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    };
  });

  const score = results.filter((r) => r.correct).length;
  const total = results.length;

  // Save only what's needed for score history
  await Attempt.create({
    playerName,
    lessonNumber,
    score,
    total,
    answers: results.map((r) => ({
      questionId: r.questionId,
      selected: r.selected || "(none)",
      correct: r.correct,
    })),
  });

  sendResponse(res, HTTP_STATUS.CREATED, "Quiz submitted.", {
    playerName,
    lessonNumber,
    score,
    total,
    percentage: total ? Math.round((score / total) * 100) : 0,
    results,
  });
};