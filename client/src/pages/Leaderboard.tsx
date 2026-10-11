import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page/Page";
import LeaderboardTable from "../components/LeaderboardTable/LeaderboardTable";
import StatusMessage from "../components/StatusMessage/StatusMessage";
import { api } from "../api";
import { usePlayer } from "../hooks/usePlayer";
import type { LeaderboardRow } from "../types";
import styles from "./Leaderboard.module.css";


export default function Leaderboard() {
  const { playerName } = usePlayer();

  
  const [rows, setRows] = useState<LeaderboardRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    let cancelled = false; 

    api
      .getLeaderboard()
      .then((data) => {
        if (!cancelled) setRows(data); 
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Something went wrong.");
      });

    return () => {
      cancelled = true;
    };
  }, []); 

  const loading = rows === null && error === null;

  return (
    <Page narrow>
      <div className={styles.head}>
        <h1 className={styles.title}>Leaderboard</h1>
        <p className={styles.lead}>
          Points are your best score on each lesson, added up. Retakes can raise a score but never count twice.
        </p>
      </div>

      {loading && <StatusMessage kind="loading">Loading leaderboard…</StatusMessage>}
      {error && <StatusMessage kind="error">{error}</StatusMessage>}

      {rows && rows.length === 0 && (
        <StatusMessage kind="empty">
          No scores yet. <Link to="/lessons">Take a quiz</Link> to be the first on the board.
        </StatusMessage>
      )}

      {rows && rows.length > 0 && <LeaderboardTable rows={rows} currentPlayer={playerName} />}

      <p className={styles.note}>Names are whatever players typed in. Pick one your friends will recognize.</p>
    </Page>
  );
}