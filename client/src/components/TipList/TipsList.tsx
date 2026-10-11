import styles from "./TipList.module.css";

interface TipsListProps {
  tips: string[];
}


export default function TipsList({ tips }: TipsListProps) {
  return (
    <ul className={styles.list}>
      {tips.map((tip) => (
        <li key={tip} className={styles.item}>
          {tip}
        </li>
      ))}
    </ul>
  );
}