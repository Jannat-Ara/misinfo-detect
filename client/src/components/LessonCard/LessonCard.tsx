import { Link } from "react-router-dom";
import LessonIllustration from "../LessonIllustration/LessonIllustration";
import type { LessonSummary } from "../../types";
import styles from "./LessonCard.module.css";


export type LessonStatus =
  | { kind: "done"; score: number; total: number }
  | { kind: "next" }
  | { kind: "todo" };

interface LessonCardProps {
  lesson: LessonSummary;
  status: LessonStatus;
}


export default function LessonCard({ lesson, status }: LessonCardProps) {
  const isNext = status.kind === "next";

  return (
    <Link to={`/lessons/${lesson.lessonNumber}`} className={isNext ? `${styles.card} ${styles.next}` : styles.card}>
      <span className={styles.number}>{lesson.lessonNumber}</span>
      <LessonIllustration lessonNumber={lesson.lessonNumber} />
      <span className={styles.text}>
        <strong className={styles.title}>{lesson.title}</strong>
        <span className={styles.summary}>{lesson.summary}</span>
      </span>

      {status.kind === "done" && (
        <span className={`${styles.status} ${styles.done}`}>
          {status.score} of {status.total}
        </span>
      )}
      {status.kind === "next" && <span className={styles.status}>Up next</span>}
      {status.kind === "todo" && <span className={`${styles.status} ${styles.todo}`}>Not started</span>}
    </Link>
  );
}