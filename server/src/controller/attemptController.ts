import type { RequestHandler } from "express";
import { Attempt } from "../models/Attempt.js";
import { sendResponse } from "../common/sendResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { Lesson } from "../models/Lesson.js";
import mongoose from "mongoose";


export const getPlayerAttempts: RequestHandler = async (req, res) => {
  const player = typeof req.query.player === "string" ? req.query.player.trim() : "";
  if (!player) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Add ?player=<name> to the URL.");
    return;
  }

  const attempts = await Attempt.find({ playerName: player })
    .select("lessonNumber score total createdAt")
    .sort({ createdAt: -1 });

  // Keep the best score for each lesson (retakes don't add up)
  const best: Record<number, { score: number; total: number }> = {};
  for (const a of attempts) {
    if (!best[a.lessonNumber] || a.score > best[a.lessonNumber].score) {
      best[a.lessonNumber] = { score: a.score, total: a.total };
    }
  }

  const totalScore = Object.values(best).reduce((sum, b) => sum + b.score, 0);

  sendResponse(res, HTTP_STATUS.OK, "Player scores fetched.", {
    player,
    lessonsCompleted: Object.keys(best).length,
    totalScore,
    bestByLesson: best,
    attempts,
  });
};

// GET /api/attempts/leaderboard: top 10 players by total of their best score per lesson
export const getLeaderboard: RequestHandler = async (_req, res) => {
  const leaderboard = await Attempt.aggregate([
    // 1. Best score for each player on each lesson
    {
      $group: {
        _id: { player: "$playerName", lesson: "$lessonNumber" },
        best: { $max: "$score" },
      },
    },
    // 2. Add up each player's best scores
    {
      $group: {
        _id: "$_id.player",
        totalScore: { $sum: "$best" },
        lessonsCompleted: { $sum: 1 },
      },
    },
    // 3. Highest total first; ties broken by lessons completed
    { $sort: { totalScore: -1, lessonsCompleted: -1 } },
    { $limit: 10 },
    // 4. Rename _id to playerName for a cleaner response
    { $project: { _id: 0, playerName: "$_id", totalScore: 1, lessonsCompleted: 1 } },
  ]);

  sendResponse(res, HTTP_STATUS.OK, "Leaderboard fetched.", leaderboard);
};
// POST /api/attempts

export const createAttempt: RequestHandler = async (req, res) => {
  const playerName = String(req.body?.playerName ?? "").trim();
  const lessonNumber = Number(req.body?.lessonNumber);
  const answers: unknown = req.body?.answers;

  // Validate the request before touching the database
  if (!playerName) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "playerName is required.");
    return;
  }
  if (Number.isNaN(lessonNumber)) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "lessonNumber must be a number.");
    return;
  }
  if (!Array.isArray(answers)) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "answers must be an array.");
    return;
  }

  // Load the lesson WITH the correct answers (they're hidden by default)
  const lesson = await Lesson.findOne({ lessonNumber }).select(
    "+questions.correctAnswer +questions.explanation"
  );
  if (!lesson) {
    sendResponse(res, HTTP_STATUS.NOT_FOUND, `Lesson ${lessonNumber} not found.`);
    return;
  }

  // Map each questionId to the option the player picked
  const selectedById = new Map<string, string>();
  for (const a of answers) {
    if (a && mongoose.isValidObjectId(a.questionId) && typeof a.selected === "string") {
      selectedById.set(String(a.questionId), a.selected);
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

  // Save the attempt: this is what the leaderboard reads later
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

  sendResponse(res, HTTP_STATUS.CREATED, "Attempt saved.", {
    playerName,
    lessonNumber,
    score,
    total,
    percentage: total ? Math.round((score / total) * 100) : 0,
    results,
  });
};