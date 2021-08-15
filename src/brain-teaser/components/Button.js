import { cleanup } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import styles from "../css/main.min.module.css";

export default function Button({ text, duration, className, onClick,durationEnd }) {
  const [counter, setCounter] = useState(duration);

  useEffect(() => {
    if (duration) {
      if (counter > 0) setTimeout(() => setCounter((prev) => prev - 1), 1000);
      else durationEnd(counter)
    }
  }, [counter]);

  const classes = `${styles.button} ${className}`;
  return (
    <button className={classes} onClick={onClick}>
      {duration ? `${text} ${counter}` : text}
    </button>
  );
}
