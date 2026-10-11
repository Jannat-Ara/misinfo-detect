import styles from "./ScoreRing.module.css";

interface ScoreRingProps {
  score: number;
  total: number;
}


export default function ScoreRing({ score, total }: ScoreRingProps) {
  return (
    <div className={styles.ring} role="img" aria-label={`${score} out of ${total} correct`}>
      <span className={styles.score}>
        {score}
        <span className={styles.total}>/{total}</span>
      </span>
      <span className={styles.label}>correct</span>
    </div>
  );
}