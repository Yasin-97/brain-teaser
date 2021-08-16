import { cleanup } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import styles from "../css/main.min.module.css";

export default function Button({ text, duration, className, onClick }) {


  const classes = `${styles.button} ${className}`;
  return (
    <button className={classes} onClick={onClick}>
      {duration ? `${text} ${duration}` : text}
    </button>
  );
}
