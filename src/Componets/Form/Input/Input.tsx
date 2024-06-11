import React from "react";
import styles from "./Input.module.css";

type IInput = React.ComponentProps<"input"> & {
  label: string;
  name: string;
  hookProps?: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: string | null;
    validate: () => boolean;
    onBlur: () => boolean;
  };
};

const Input = ({ label, type, name, hookProps }: IInput) => {
  return (
    <div className={styles.wraper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        value={hookProps?.value}
        onChange={hookProps?.onChange}
        onBlur={hookProps?.onBlur}
      />
      {hookProps?.error && <p className={styles.error}>{hookProps.error}</p>}
    </div>
  );
};

export default Input;
