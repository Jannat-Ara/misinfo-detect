import { Link, NavLink, useNavigate } from "react-router-dom";
import { usePlayer } from "../../hooks/usePlayer";
import styles from "./Header.module.css";


function Logo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <rect x="3" y="11" width="28" height="12" rx="3" fill="#FFE45E" />
      <circle cx="14" cy="15" r="8" fill="none" stroke="#18203A" strokeWidth="2.5" />
      <path d="M20 21l8 8" stroke="#18203A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}


export default function Header() {
  const { playerName, clearPlayer } = usePlayer();
  const navigate = useNavigate();

  
  const switchPlayer = () => {
    clearPlayer();
    navigate("/");
  };

  
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <Logo />
        Spot the Fake
      </Link>

      <nav aria-label="Main" className={styles.nav}>
        <NavLink to="/lessons" className={linkClass}>
          Lessons
        </NavLink>
        <NavLink to="/leaderboard" className={linkClass}>
          Leaderboard
        </NavLink>
        {playerName && (
          <span className={styles.player}>
            Playing as <strong>{playerName}</strong>
            <button type="button" className={styles.switch} onClick={switchPlayer}>
              Switch player
            </button>
          </span>
        )}
      </nav>
    </header>
  );
}