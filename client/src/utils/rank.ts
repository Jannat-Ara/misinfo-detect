
export type RankTier = "top" | "high" | "mid" | "low";

export interface Rank {
  tier: RankTier;
  title: string;    
  message: string; 
}

export function rankFor(score: number, total: number): Rank {
  const percentage = total > 0 ? (score / total) * 100 : 0;
  const missed = total - score;

  if (percentage === 100) {
    return { tier: "top", title: "Misinfo Detective", message: "Perfect score. Nothing got past you." };
  }
  if (percentage >= 67) {
    return { tier: "high", title: "Sharp-Eyed Skeptic", message: `Great work. Only ${missed} slipped past you.` };
  }
  if (percentage >= 34) {
    return { tier: "mid", title: "Rookie Fact-Checker", message: "Good start. Read why below, then level up." };
  }
  return { tier: "low", title: "Fake News Fodder", message: "The fakes fooled you this time. Try again!" };
}