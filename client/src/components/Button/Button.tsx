import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";



type Variant = "primary" | "ghost";


interface CommonProps {
  variant?: Variant;    
  className?: string;     
  children: ReactNode;   
}


interface LinkButtonProps extends CommonProps {
  to: string;
}


interface ActionButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  to?: undefined;
}


type ButtonProps = LinkButtonProps | ActionButtonProps;



export default function Button({
  variant = "primary",
  className = "",
  children,
  to,
  ...buttonProps 
}: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${className}`;

  
  if (to !== undefined) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }


  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}