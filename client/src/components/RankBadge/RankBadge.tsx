import type { RankTier } from "../../utils/rank";
import styles from "./RankBadge.module.css";

interface RankBadgeProps {
  tier: RankTier;
  title: string;
}


export default function RankBadge({ tier, title }: RankBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[tier]}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
        <circle cx="12" cy="9" r="6" />
        <path d="M8.5 14 7 22l5-3 5 3-1.5-8" />
      </svg>
      <span>
        <span className={styles.label}>Rank: </span>
        {title}
      </span>
    </span>
  );
}