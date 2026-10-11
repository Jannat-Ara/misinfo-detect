
import type {
  ApiResponse,
  CheckResult,
  LeaderboardRow,
  Lesson,
  LessonSummary,
  PlayerScores,
  SubmitResult,
} from "./types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";


async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } catch {
    throw new Error("Can't reach the server. Check that the backend is running and try again.");
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok || !body?.success) {
    throw new Error(body?.message ?? `Request failed (${response.status}).`);
  }
  return body.result as T;
}

export const api = {
  getLessons: () => request<LessonSummary[]>("/api/lessons"),

  getLesson: (lessonNumber: number) => request<Lesson>(`/api/lessons/${lessonNumber}`),

  checkAnswer: (lessonNumber: number, questionId: string, selected: string) =>
    request<CheckResult>(`/api/lessons/${lessonNumber}/questions/${questionId}/check`, {
      method: "POST",
      body: JSON.stringify({ selected }),
    }),
  submitQuiz: (
    lessonNumber: number,
    playerName: string,
    answers: { questionId: string; selected: string }[]
  ) =>
    request<SubmitResult>("/api/attempts", {
      method: "POST",
      body: JSON.stringify({ playerName, lessonNumber, answers }),
    }),


  getPlayerScores: (playerName: string) =>
    request<PlayerScores>(`/api/attempts?player=${encodeURIComponent(playerName)}`),

  getLeaderboard: () => request<LeaderboardRow[]>("/api/attempts/leaderboard"),
};