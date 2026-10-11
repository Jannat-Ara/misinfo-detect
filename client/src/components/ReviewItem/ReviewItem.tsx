import styles from "./ReviewItem.module.css";

interface ReviewItemProps {
  prompt: string;
  correct: boolean;
  yourAnswer: string;     
  correctAnswer: string;   
  explanation: string;
}

function ResultIcon({ correct }: { correct: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" role="img" aria-label={correct ? "Correct" : "Incorrect"} className={styles.icon}>
      <circle cx="14" cy="14" r="13" className={correct ? styles.iconRight : styles.iconWrong} />
      {correct ? (
        <path d="M8 14.5l4 4 8-9" className={styles.iconMark} />
      ) : (
        <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" className={styles.iconMark} />
      )}
    </svg>
  );
}

export default function ReviewItem({ prompt, correct, yourAnswer, correctAnswer, explanation }: ReviewItemProps) {
  return (
    <li className={styles.item}>
      <ResultIcon correct={correct} />
      <div className={styles.body}>
        <strong className={styles.prompt}>{prompt}</strong>
        {correct ? (
          <span className={styles.muted}>You answered: {yourAnswer}</span>
        ) : (
          <>
            <span>
              You answered: <em>{yourAnswer}</em>
            </span>
            <span>
              Correct answer: <strong>{correctAnswer}</strong>
            </span>
          </>
        )}
        <p className={styles.explanation}>{explanation}</p>
      </div>
    </li>
  );
}