import OptionButton from "../OptionButton/OptionButton";
import type { OptionState } from "../OptionButton/OptionButton";
import type { CheckResult, Question } from "../../types";
import styles from "./QuestionView.module.css";

interface QuestionViewProps {
  question: Question;
  picked: string | null;          
  feedback: CheckResult | null;    
  onPick: (optionId: string) => void;
}

export default function QuestionView({ question, picked, feedback, onPick }: QuestionViewProps) {
  const isCompare = question.type === "headline-compare";


  const stateFor = (optionId: string): OptionState => {
    if (!feedback) return optionId === picked ? "picked" : "idle";
    if (optionId === feedback.correctAnswer) return "right";
    if (optionId === picked) return "wrong";
    return "idle";
  };

  return (
    <div className={styles.question}>
      <h1 className={styles.prompt}>{question.prompt}</h1>
      <div className={isCompare ? styles.compare : styles.list}>
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            option={option}
            layout={isCompare ? "card" : "row"}
            state={stateFor(option.id)}
            locked={feedback !== null}
            onSelect={onPick}
          />
        ))}
      </div>
    </div>
  );
}