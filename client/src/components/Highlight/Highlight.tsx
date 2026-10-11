import type { CSSProperties, ReactNode } from "react";
import styles from "./Highlight.module.css";

interface HighlightProps {
  children: ReactNode;
  animate?: boolean; // true = the marker "swipes" across when the page loads
  delay?: number;    // seconds to wait before swiping (to swipe several in order)
}

// The yellow highlighter mark. Used only for red flags, so it keeps its meaning.
export default function Highlight({ children, animate = false, delay = 0 }: HighlightProps) {
  const style: CSSProperties | undefined = animate ? { animationDelay: `${delay}s` } : undefined;
  return (
    <mark className={`${styles.mark} ${animate ? styles.swipe : ""}`} style={style}>
      {children}
    </mark>
  );
}