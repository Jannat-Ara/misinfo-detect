import type { ReactNode } from "react";
import styles from "./Page.module.css";

interface PageProps {
  narrow?: boolean;   
  children: ReactNode;
}

export default function Page({ narrow = false, children }: PageProps) {
  return <main className={`${styles.page} ${narrow ? styles.narrow : ""}`}>{children}</main>;
}