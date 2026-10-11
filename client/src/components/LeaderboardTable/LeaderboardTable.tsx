import type { LeaderboardRow } from "../../types";
import styles from "./LeaderboardTable.module.css";

interface LeaderboardTableProps {
  rows: LeaderboardRow[];
  currentPlayer: string;   
}


export default function LeaderboardTable({ rows, currentPlayer }: LeaderboardTableProps) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>{rows.length === 1 ? "Top player" : `Top ${rows.length} players`}</caption>
        <thead>
          <tr>
            <th scope="col" className={styles.rankCol}>
              Rank
            </th>
            <th scope="col">Name</th>
            <th scope="col">Lessons done</th>
            <th scope="col" className={styles.num}>
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isMe = row.playerName === currentPlayer;
            return (
              <tr key={row.playerName} className={isMe ? styles.me : undefined} aria-current={isMe ? "true" : undefined}>
                <td className={styles.rank}>{i + 1}</td>
                <td>{row.playerName}</td>
                <td>{row.lessonsCompleted}</td>
                <td className={styles.num}>{row.totalScore}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}