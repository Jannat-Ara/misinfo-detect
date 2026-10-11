import { useState } from "react";
import type { FormEvent } from "react";
import { usePlayer } from "../../hooks/usePlayer";
import { anonymousName } from "../../utils/anonymousName";
import Button from "../Button/Button";
import styles from "./NameForm.module.css";

interface NameFormProps {
  buttonLabel: string;    
  onSaved?: () => void;   
}


export default function NameForm({ buttonLabel, onSaved }: NameFormProps) {
  const { playerName, setPlayerName } = usePlayer();
  const [value, setValue] = useState(playerName); 
  const [error, setError] = useState("");

  
  const save = (name: string) => {
    setPlayerName(name);
    setError("");
    onSaved?.(); 
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (!value.trim()) {
      setError("Enter a name, or choose to play anonymously.");
      return;
    }
    save(value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="player-name" className={styles.label}>
        Your name for the leaderboard
      </label>
      <div className={styles.row}>
        <input
          id="player-name"
          className={styles.input}
          type="text"
          value={value}
          maxLength={30}
          autoComplete="nickname"
          placeholder="e.g. Raya"
          aria-invalid={error ? true : undefined}
          aria-describedby="player-name-hint"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit">{buttonLabel}</Button>
      </div>
      <p id="player-name-hint" className={error ? `${styles.hint} ${styles.error}` : styles.hint}>
        {error || "Only your name is saved. No account or email needed."}
      </p>
      <div className={styles.anon}>
        <span className={styles.or}>or</span>
        <Button variant="ghost" onClick={() => save(anonymousName())}>
          Play anonymously
        </Button>
      </div>
    </form>
  );
}