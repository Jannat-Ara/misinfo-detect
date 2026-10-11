import styles from "./HintBox.module.css";

interface HintBoxProps {
  hint: string;
  shown: boolean;        
  disabled: boolean;     
  onShow: () => void;
}


export default function HintBox({ hint, shown, disabled, onShow }: HintBoxProps) {
  if (shown) {
    return (
      <p className={styles.hint} role="note">
        <span className={styles.label}>Hint</span>
        {hint}
      </p>
    );
  }

  return (
    <button type="button" className={styles.button} onClick={onShow} disabled={disabled}>
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
        <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
      </svg>
      Need a hint?
    </button>
  );
}