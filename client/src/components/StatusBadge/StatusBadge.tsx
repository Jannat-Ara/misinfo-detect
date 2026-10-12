import type { LessonStatus } from "../LessonCard/LessonCard";
import styles from "./StatusBadge.module.css";

interface StatusBadgeProps {
  status: LessonStatus;
}

// Small animated pill that shows where the player is with a lesson
export default function StatusBadge({ status }: StatusBadgeProps) {
  if (status.kind === "done") {
    return (
      <span className={`${styles.badge} ${styles.done}`}>
        <span className={styles.check} aria-hidden="true">✓</span>
        {status.score}/{status.total}
      </span>
    );
  }

  if (status.kind === "next") {
    return (
      <span className={`${styles.badge} ${styles.next}`}>
        Up next
        <span className={styles.arrow} aria-hidden="true">→</span>
      </span>
    );
  }

  return <span className={`${styles.badge} ${styles.todo}`}>Not started</span>;
}