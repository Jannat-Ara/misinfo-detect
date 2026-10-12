import { useState } from "react";
import styles from "./LessonSteps.module.css";

interface LessonStepsProps {
  paragraphs: string[];
  onFinish?: () => void;
}

// Shows the lesson one part at a time, like levels in a game
export default function LessonSteps({ paragraphs, onFinish }: LessonStepsProps) {
  const [shown, setShown] = useState(1);
  const total = paragraphs.length;

  if (total === 0) return null;

  const finished = shown >= total;

  const showNext = () => {
    const next = Math.min(shown + 1, total);
    setShown(next);
    if (next >= total) onFinish?.();
  };

  const showAll = () => {
    setShown(total);
    onFinish?.();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.progressRow}>
        <span className={styles.progressText}>
          Part {Math.min(shown, total)} of {total}
        </span>
        <div
          className={styles.track}
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={shown}
        >
          <div className={styles.fill} style={{ width: `${(Math.min(shown, total) / total) * 100}%` }} />
        </div>
      </div>

      <ol className={styles.list}>
        {paragraphs.slice(0, shown).map((paragraph, i) => (
          <li key={i} className={styles.card}>
            <span className={styles.badge} aria-hidden="true">
              {i + 1}
            </span>
            <p className={styles.text}>{paragraph}</p>
          </li>
        ))}
      </ol>

      {/* aria-live tells screen readers when the message changes */}
      <div aria-live="polite">
        {finished ? (
          <p className={styles.done}>
            <span className={styles.star} aria-hidden="true">★</span>
            Nice work, you read the whole lesson! Tick off the red flags, then take the quiz.
          </p>
        ) : (
          <div className={styles.actions}>
            <button type="button" className={styles.next} onClick={showNext}>
              Continue reading <span className={styles.arrow} aria-hidden="true">→</span>
            </button>
            <button type="button" className={styles.skip} onClick={showAll}>
              Show all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}