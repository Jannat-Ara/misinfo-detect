import { useState } from "react";
import styles from "./RedFlagChecklist.module.css";

interface RedFlagChecklistProps {
  tips: string[];
}

// Red flags the player ticks off; each one gets "highlighted" when ticked
export default function RedFlagChecklist({ tips }: RedFlagChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const count = checked.size;
  const allDone = tips.length > 0 && count === tips.length;

  return (
    <div className={styles.wrap}>
      <div className={styles.counterRow}>
        <span className={styles.counter}>
          {count} of {tips.length} spotted
        </span>
        <div className={styles.dots} aria-hidden="true">
          {tips.map((tip, i) => (
            <span key={tip} className={checked.has(i) ? `${styles.dot} ${styles.dotOn}` : styles.dot} />
          ))}
        </div>
      </div>

      <ul className={styles.list}>
        {tips.map((tip, i) => {
          const on = checked.has(i);
          return (
            <li key={tip}>
              <button
                type="button"
                className={on ? `${styles.item} ${styles.on}` : styles.item}
                aria-pressed={on}
                onClick={() => toggle(i)}
              >
                <span className={styles.box} aria-hidden="true">
                  {on ? "✓" : ""}
                </span>
                <span className={styles.label}>{tip}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {allDone && (
        <p className={styles.allDone} role="status">
          All red flags spotted. You're ready!
        </p>
      )}
    </div>
  );
}