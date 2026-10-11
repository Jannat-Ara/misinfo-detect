import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;        
  max: number;       
  label: string;       
  segmented?: boolean;  
}


export default function ProgressBar({ value, max, label, segmented = false }: ProgressBarProps) {

  const a11y = {
    role: "progressbar",
    "aria-label": label,
    "aria-valuemin": 0,
    "aria-valuemax": max,
    "aria-valuenow": value,
  } as const;

  if (segmented) {
    return (
      <div
        {...a11y}
        className={styles.segments}
        style={{ gridTemplateColumns: `repeat(${max}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: max }, (_, i) => (
          <div key={i} className={i < value ? `${styles.segment} ${styles.filled}` : styles.segment} />
        ))}
      </div>
    );
  }


  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div {...a11y} className={styles.track}>
      <div className={styles.fill} style={{ width: `${percent}%` }} />
    </div>
  );
}