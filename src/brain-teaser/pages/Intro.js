import React from "react";
import {Link} from 'react-router-dom'
import Button from "../components/Button";
import Card from "../components/Card";
import styles from "../css/main.min.module.css";

export default function Intro() {
  return (
    <Card
      className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center}`}
    >
      <div className={styles.header}>
        <h1 className={styles.welcome}>Welocme </h1>
        <h1>To</h1>
        <h1 className={styles.game_name}>Memo Order</h1>
      </div>
      <div className={styles.desc}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
          obcaecati. Expedita voluptate quam ratione nam debitis beatae dolor
          voluptatem, animi consequuntur! Ipsa doloribus expedita architecto
          quam possimus voluptatum quasi sapiente!
        </p>
      </div>
      <Link to="/difficulty-specify">
      <Button className={styles.action_Btn} text={'GET GOING'}/>
      </Link>
    </Card>
  );
}
