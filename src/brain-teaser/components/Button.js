import { cleanup } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import styles from "../css/main.min.module.css";

export default function Button({ text,disabled, duration, className, onClick }) {

// const disabling=disabled&&true
// console.log(disabling,disabled)
  // const classes = `${styles.button} ${className}`;
  return (
    <button disabled={disabled}  className={`${className} ${disabled&&styles.onWait_btn}`} onClick={onClick}>
      {duration ? `${text} ${duration}` : text}
    </button>
  );
}
