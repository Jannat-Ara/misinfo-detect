import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLElement> {

  as?: "div" | "section" | "aside" | "article";
  children: ReactNode;
}


export default function Card({ as: Tag = "div", className = "", children, ...rest }: CardProps) {
  return (
    <Tag className={`${styles.card} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}