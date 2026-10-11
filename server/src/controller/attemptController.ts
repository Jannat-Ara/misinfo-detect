import type { RequestHandler } from "express";
import { Attempt } from "../models/Attempt.js";
import { sendResponse } from "../common/sendResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

// GET /api/attempts?player=Raya: one person's score history, newest first
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