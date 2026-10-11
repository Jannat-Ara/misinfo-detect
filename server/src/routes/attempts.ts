import { Router } from "express";
import { getPlayerAttempts, getLeaderboard } from "../controller/attemptController.js";

const router = Router();

router.get("/leaderboard", getLeaderboard); // top 10 players
router.get("/", getPlayerAttempts);         // one player's scores: /api/attempts?player=Raya

export default router;