import type { ReactNode } from "react";
import styles from "./LessonIllustration.module.css";


const drawings: Record<number, ReactNode> = {

  1: (
    <>
      <rect x="18" y="20" width="28" height="18" rx="3" className={styles.mark} />
      <g className={styles.ink}>
        <path d="M14 12h36a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H30l-10 8v-8h-6a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z" />
        <path d="M27 23a5 5 0 1 1 7 4.6c-1.4.6-2 1.6-2 3v1.4" />
      </g>
      <circle cx="32" cy="36.5" r="1.8" className={styles.dot} />
    </>
  ),
  
  2: (
    <>
      <circle cx="44" cy="44" r="11" className={styles.mark} />
      <g className={styles.ink}>
        <path d="M26 8v26a9 9 0 0 1-18 0v-3" />
        <path d="M8 31l4 4" />
        <path d="M38 36l17 6-7.5 2.5L45 52z" />
      </g>
    </>
  ),
  
  3: (
    <>
      <rect x="12" y="16" width="32" height="8" rx="2" className={styles.mark} />
      <g className={styles.ink}>
        <rect x="8" y="10" width="40" height="42" rx="3" />
        <path d="M15 20h26M15 30h18M15 37h18M15 44h12" />
      </g>
      <circle cx="47" cy="47" r="10" className={styles.rejectBg} />
      <path d="M43 43l8 8M51 43l-8 8" className={styles.reject} />
    </>
  ),
  
  4: (
    <>
      <rect x="30" y="16" width="26" height="22" className={styles.mark} />
      <g className={styles.ink}>
        <rect x="8" y="12" width="44" height="38" rx="3" />
        <path d="M8 44l13-13 9 9 7-6 15 12" />
        <circle cx="22" cy="22" r="4" />
        <rect x="30" y="16" width="26" height="22" strokeDasharray="4 3" />
      </g>
    </>
  ),
  
  5: (
    <>
      <path d="M47 34l10 18H37z" className={styles.mark} />
      <g className={styles.ink}>
        <circle cx="27" cy="28" r="17" />
        <path d="M10 28h34M27 11c6 6 6 28 0 34M27 11c-6 6-6 28 0 34" />
        <path d="M47 34l10 18H37z" />
        <path d="M47 40v6" />
      </g>
      <circle cx="47" cy="49" r="1.5" className={styles.dot} />
    </>
  ),
  
  6: (
    <>
      <circle cx="45" cy="43" r="9" className={styles.mark} />
      <g className={styles.ink}>
        <rect x="6" y="12" width="40" height="30" rx="3" />
        <circle cx="18" cy="24" r="5" />
        <path d="M11 36c2-4 12-4 14 0" />
        <path d="M30 22h10M30 28h8" />
        <circle cx="45" cy="43" r="9" />
        <path d="M51.5 49.5l6 6" />
      </g>
    </>
  ),
  
  7: (
    <>
      <rect x="30" y="31" width="12" height="11" rx="2" className={styles.mark} />
      <g className={styles.ink}>
        <rect x="8" y="12" width="44" height="40" rx="3" />
        <path d="M8 22h44M19 8v8M41 8v8" />
        <path d="M15 31h6M15 39h6M15 46h6M33 46h6" />
        <rect x="30" y="31" width="12" height="11" rx="2" />
      </g>
    </>
  ),

  8: (
    <>
      <circle cx="26" cy="26" r="16" className={styles.mark} />
      <g className={styles.ink}>
        <circle cx="26" cy="26" r="16" />
        <path d="M38 38l15 15" />
        <path d="M19 26l5 5 9-10" />
      </g>
    </>
  ),

  9: (
    <>
      <rect x="22" y="38" width="20" height="8" rx="2" className={styles.mark} />
      <g className={styles.ink}>
        <rect x="18" y="6" width="28" height="52" rx="5" />
        <path d="M28 52h8" />
        <circle cx="26" cy="22" r="3" />
        <circle cx="38" cy="16" r="3" />
        <circle cx="38" cy="29" r="3" />
        <path d="M28.7 20.6l6.6-3.2M28.7 23.4l6.6 4.2" />
      </g>
    </>
  ),

  10: (
    <>
      <rect x="33" y="18" width="24" height="26" rx="4" className={styles.mark} />
      <g className={styles.ink}>
        <path d="M30 8c-10 0-16 7-16 17 0 6 2 8 2 11 0 3-4 5-4 8 0 4 4 6 8 6h4v6" />
        <path d="M30 8v50" />
        <path d="M34 31h4l3-9 4 18 3-13 3 7h6" />
      </g>
    </>
  ),

  11: (
    <>
      <rect x="35" y="12" width="11" height="42" className={styles.mark} />
      <g className={styles.ink}>
        <path d="M10 8v46h46" />
        <rect x="19" y="32" width="11" height="22" />
        <rect x="35" y="12" width="11" height="42" />
        <path d="M6 46l8-2.5-8-2.5 8-2.5" />
      </g>
    </>
  ),

  12: (
    <>
      <circle cx="30" cy="34" r="14" className={styles.mark} />
      <g className={styles.ink}>
        <circle cx="30" cy="34" r="22" />
        <circle cx="30" cy="34" r="14" />
        <circle cx="30" cy="34" r="5" />
        <path d="M30 34l22-22M46 12h6v6" />
      </g>
    </>
  ),
};


const fallback = drawings[8];

interface LessonIllustrationProps {
  lessonNumber: number;
  size?: number;   
  framed?: boolean;       
}

export default function LessonIllustration({ lessonNumber, size = 72, framed = false }: LessonIllustrationProps) {
  const classes = [styles.tile, framed ? styles.framed : "", size > 100 ? styles.large : ""].join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className={classes}>
      {drawings[lessonNumber] ?? fallback}
    </svg>
  );
}