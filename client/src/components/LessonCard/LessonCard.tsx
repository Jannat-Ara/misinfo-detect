import { Link } from "react-router-dom";
import LessonIllustration from "../LessonIllustration/LessonIllustration";
import StatusBadge from "../StatusBadge/StatusBadge";
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

// One lesson in the list: number, drawing, title, summary and an animated status pill
export default function LessonCard({ lesson, status }: LessonCardProps) {
  const isNext = status.kind === "next";

  return (
    <Link
      to={`/lessons/${lesson.lessonNumber}`}
      className={isNext ? `${styles.card} ${styles.next}` : styles.card}
    >
      <span className={styles.number}>{lesson.lessonNumber}</span>
      <LessonIllustration lessonNumber={lesson.lessonNumber} />
      <span className={styles.text}>
        <strong className={styles.title}>{lesson.title}</strong>
        <span className={styles.summary}>{lesson.summary}</span>
      </span>

      <StatusBadge status={status} />
    </Link>
  );
}