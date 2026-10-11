import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import Page from "../components/Page/Page";
import Button from "../components/Button/Button";
import ScoreRing from "../components/ScoreRing/ScoreRing";
import ReviewItem from "../components/ReviewItem/ReviewItem";
import RankBadge from "../components/RankBadge/RankBadge";
import TipsList from "../components/TipList/TipsList";
import Card from "../components/Card/Card";
import { rankFor } from "../utils/rank";
import { api } from "../api";
import { usePlayer } from "../hooks/usePlayer";
import type { LessonSummary, ResultsState } from "../types";
import styles from "./Results.module.css";


export default function Results() {
  const lessonNumber = Number(useParams().number);
  const state = useLocation().state as ResultsState | null;
  const { playerName } = usePlayer();

  const [lessons, setLessons] = useState<LessonSummary[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getLessons()
      .then((data) => {
        if (!cancelled) setLessons(data);
      })
      .catch(() => {
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!state) return <Navigate to={`/lessons/${lessonNumber}`} replace />;

  const { result, questions, lessonTitle, tips, hintsUsed } = state;
  const rank = rankFor(result.score, result.total);
  const shouldRetry = result.percentage < 50; 
  const nextLesson = lessons?.find((l) => l.lessonNumber > lessonNumber);


  const optionText = (questionId: string, optionId: string) =>
    questions.find((q) => q._id === questionId)?.options.find((o) => o.id === optionId)?.text ?? "No answer";

  return (
    <Page narrow>
      <section className={styles.summary}>
        <ScoreRing score={result.score} total={result.total} />
        <div className={styles.verdict}>
          <span className={styles.lessonName}>
            Lesson {lessonNumber}: {lessonTitle}
          </span>
          <RankBadge tier={rank.tier} title={rank.title} />
          <h1 className={styles.title}>{rank.message}</h1>
          <p className={styles.saved}>
            Saved to the leaderboard as <strong>{playerName}</strong>. Your best score on each lesson counts.
            {hintsUsed > 0 && ` You used ${hintsUsed} ${hintsUsed === 1 ? "hint" : "hints"}.`}
          </p>
        </div>
      </section>

      <section aria-labelledby="review" className={styles.review}>
        <h2 id="review" className={styles.reviewTitle}>
          Review your answers
        </h2>
        <ol className={styles.list}>
          {result.results.map((r) => (
            <ReviewItem
              key={r.questionId}
              prompt={r.prompt}
              correct={r.correct}
              yourAnswer={optionText(r.questionId, r.selected)}
              correctAnswer={optionText(r.questionId, r.correctAnswer)}
              explanation={r.explanation}
            />
          ))}
        </ol>
      </section>


      {tips.length > 0 && (
        <Card as="section" aria-labelledby="takeaways" className={styles.tips}>
          <h2 id="takeaways" className={styles.reviewTitle}>
            Remember these red flags
          </h2>
          <TipsList tips={tips} />
        </Card>
      )}

      <div className={styles.actions}>

        {shouldRetry && <Button to={`/lessons/${lessonNumber}/quiz`}>Try again</Button>}
        {nextLesson ? (
          <Button variant={shouldRetry ? "ghost" : "primary"} to={`/lessons/${nextLesson.lessonNumber}`}>
            Next lesson: {nextLesson.title}
          </Button>
        ) : (
          <Button variant={shouldRetry ? "ghost" : "primary"} to="/lessons">
            Back to all lessons
          </Button>
        )}
        {!shouldRetry && (
          <Button variant="ghost" to={`/lessons/${lessonNumber}/quiz`}>
            Retake this quiz
          </Button>
        )}
        <Button variant="ghost" to="/leaderboard">
          View leaderboard
        </Button>
      </div>
    </Page>
  );
}