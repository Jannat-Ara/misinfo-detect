import { useEffect, useState } from "react";
import Page from "../components/Page/Page";
import LessonCard from "../components/LessonCard/LessonCard";
import type { LessonStatus } from "../components/LessonCard/LessonCard";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import StatusMessage from "../components/StatusMessage/StatusMessage";
import { api } from "../api";
import { usePlayer } from "../hooks/usePlayer";
import type { LessonSummary, PlayerScores } from "../types";
import styles from "./Lessons.module.css";


export default function Lessons() {
  const { playerName } = usePlayer();


  const [lessons, setLessons] = useState<LessonSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scores, setScores] = useState<{ player: string; data: PlayerScores } | null>(null);

  useEffect(() => {
    let cancelled = false; 

    api
      .getLessons()
      .then((data) => {
        if (!cancelled) setLessons(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Something went wrong.");
      });

    return () => {
      cancelled = true; 
    };
  }, []); 

 
  useEffect(() => {
    if (!playerName) return; 
    let cancelled = false;

    api
      .getPlayerScores(playerName)
      .then((data) => {
        if (!cancelled) setScores({ player: playerName, data });
      })
      .catch(() => {
        // Scores are optional: if they fail, the lessons still show as "Not started"
      });

    return () => {
      cancelled = true;
    };
  }, [playerName]); 

  const loading = lessons === null && error === null;

  if (loading) {
    return (
      <Page>
        <StatusMessage kind="loading">Loading lessons…</StatusMessage>
      </Page>
    );
  }

  if (error || !lessons) {
    return (
      <Page>
        <StatusMessage kind="error">{error}</StatusMessage>
      </Page>
    );
  }


  const best = scores && scores.player === playerName ? scores.data.bestByLesson : {};

  if (lessons.length === 0) {
    return (
      <Page>
        <h1 className={styles.title}>Lessons</h1>
        <StatusMessage kind="empty">No lessons yet. Add some on the server, then refresh.</StatusMessage>
      </Page>
    );
  }


  const doneCount = lessons.filter((l) => best[l.lessonNumber]).length;
  const nextNumber = lessons.find((l) => !best[l.lessonNumber])?.lessonNumber;

  const statusFor = (lessonNumber: number): LessonStatus => {
    const result = best[lessonNumber];
    if (result) return { kind: "done", score: result.score, total: result.total };
    if (lessonNumber === nextNumber) return { kind: "next" };
    return { kind: "todo" };
  };

  return (
    <Page>
      <div className={styles.head}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Lessons</h1>
          <p className={styles.lead}>Go in order, or jump to any topic. The final challenge mixes everything.</p>
        </div>
        <div className={styles.progress}>
          <span className={styles.progressLabel}>
            {doneCount} of {lessons.length} lessons done
          </span>
          <ProgressBar value={doneCount} max={lessons.length} label="Lessons completed" />
        </div>
      </div>

      <ol className={styles.list}>
        {lessons.map((lesson) => (
          <li key={lesson._id}>
            <LessonCard lesson={lesson} status={statusFor(lesson.lessonNumber)} />
          </li>
        ))}
      </ol>
    </Page>
  );
}