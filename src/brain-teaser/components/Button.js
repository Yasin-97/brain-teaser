import React from "react";
import styles from "../css/main.min.module.css";

export default function Button({
  text,
  disabled,
  duration,
  className,
  onClick,
}) {
  return (
    <button
      disabled={disabled}
      className={`${className} ${disabled && styles.onWait_btn}`}
      onClick={onClick}
    >
      {duration ? `${text} ${duration}` : text}
    </button>
  );
}
