import Card from "../Card/Card";
import type { CheckResult } from "../../types";
import styles from "./FeedbackPanel.module.css";

interface FeedbackPanelProps {
  feedback: CheckResult;
  questionIndex: number; 
}


const RIGHT_STAMPS = ["Correct", "Spot on", "Nailed it", "Sharp eye"];
const WRONG_STAMPS = ["Not quite", "Fooled you", "Close one", "Tricky one"];


export default function FeedbackPanel({ feedback, questionIndex }: FeedbackPanelProps) {
  const stamps = feedback.correct ? RIGHT_STAMPS : WRONG_STAMPS;
  const stamp = stamps[questionIndex % stamps.length];

  return (
    <Card as="section" className={styles.panel}>
      <span className={`${styles.stamp} ${feedback.correct ? styles.right : styles.wrong}`}>{stamp}</span>
      <p className={styles.explanation}>{feedback.explanation}</p>
    </Card>
  );
}