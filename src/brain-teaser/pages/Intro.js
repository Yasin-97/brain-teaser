import React from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/Context";
import Card from "../components/Card";
import styles from "../css/main.min.module.css";

export default function Intro() {
  //context
  const { isOnline, setInternetConnection } = useDataContext();

  return (
    <Card
      className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center}`}
    >
      {!isOnline && (
        <div
          className={`${styles.offline_message} ${
            !isOnline && styles.offline_message_show
          }`}
        >
          <p>You probably are't connected to internet! please check it out.</p>
          <button
            className={styles.offline_message_btn}
            onClick={() => setInternetConnection(true)}
          >
            Ok
          </button>
        </div>
      )}
      <div className={styles.header}>
        <h1 className={styles.welcome}>Welocme </h1>
        <h1 className={styles.to}>To</h1>
        <h1 className={styles.game_name}>Memo Order</h1>
      </div>
      <div className={styles.desc}>
        <p>
          In this brain-teaser like game you are going to be given some random
          words to memorize its order then they get unorderd and you are going
          to get them back in order in the given time.
        </p>
      </div>
      <Link
        to="/difficulty-specify"
        className={styles.intro_btn}
        onClick={() => setInternetConnection(true)}
      >
        GET GOING
      </Link>
    </Card>
  );
}
