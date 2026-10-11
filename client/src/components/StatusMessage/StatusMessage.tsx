import type { ReactNode } from "react";
import styles from "./StatusMessage.module.css";

type Kind = "loading" | "error" | "empty";

interface StatusMessageProps {
  kind: Kind;
  children: ReactNode; 
}


export default function StatusMessage({ kind, children }: StatusMessageProps) {
  return (
    <div className={`${styles.status} ${styles[kind]}`} role={kind === "error" ? "alert" : "status"}>
      {kind === "error" && <strong>Couldn’t load this. </strong>}
      {children}
    </div>
  );
}