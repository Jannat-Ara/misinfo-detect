import { Router } from "express";
import { getPlayerAttempts, getLeaderboard, createAttempt } from "../controller/attemptController.js";

const router = Router();

router.post("/", createAttempt);             // save a quiz attempt
router.get("/leaderboard", getLeaderboard); // top 10 players
router.get("/", getPlayerAttempts);         // one player's scores: /api/attempts?player=Raya

export default router;