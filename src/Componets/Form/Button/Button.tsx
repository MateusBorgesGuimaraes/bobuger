import React from "react";
import styles from "./Button.module.css";

type Ibutton = React.ComponentProps<"button"> & {
  children: React.ReactNode;
};

const Button = ({ children, disabled, ...props }: Ibutton) => {
  return (
    <button {...props} disabled={disabled} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;
