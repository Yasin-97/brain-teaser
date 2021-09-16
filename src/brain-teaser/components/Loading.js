import React, { useState, useEffect } from "react";
import styles from "../css/main.min.module.css";

const Loading = () => {
  //state
  const [counter, setCounter] = useState(0);

  //effect
  useEffect(() => {
    let timer;
    if (counter > 8) clearTimeout(timer);
    else timer = setTimeout(() => setCounter((pre) => pre + 1), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  return counter < 8 ? (
    <div className={styles.loadingio_spinner_ellipsis}>
      <div className={styles.ldio_u7a57o0omg}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <p className={styles.warning_text}>
      Slow internet! Please check internet connection.
    </p>
  );
};

export default Loading;
