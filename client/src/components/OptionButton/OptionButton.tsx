import type { Option } from "../../types";
import styles from "./OptionButton.module.css";


export type OptionState = "idle" | "picked" | "right" | "wrong";

interface OptionButtonProps {
  option: Option;
  layout: "card" | "row";
  state: OptionState;
  locked: boolean;        
  onSelect: (optionId: string) => void;
}


const TAGS: Partial<Record<OptionState, string>> = {
  right: "Correct answer",
  wrong: "Your answer",
};


export default function OptionButton({ option, layout, state, locked, onSelect }: OptionButtonProps) {
  const letter = option.id.toUpperCase();
  const tag = TAGS[state];
  const classes = `${styles.option} ${styles[layout]} ${styles[state]}`;

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={state === "picked"}
      disabled={locked}
      onClick={() => onSelect(option.id)}
    >
      {layout === "card" ? (
        <>
          <span className={styles.cardLabel}>Option {letter}</span>
          <span className={styles.headline}>{option.text}</span>
        </>
      ) : (
        <>
          <span className={styles.letter}>{letter}</span>
          <span className={styles.text}>{option.text}</span>
        </>
      )}
      {tag && <span className={styles.tag}>{tag}</span>}
    </button>
  );
}