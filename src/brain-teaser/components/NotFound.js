import React from 'react'
import { Link } from "react-router-dom";
import styles from '../css/main.min.module.css'
import Card from './Card'


export default function NotFound() {
    return (
           <Card
            className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_center}`}
            >
            <div className={styles.overlay_content}>
                <h4 className={styles.overlay_header}>404!</h4>
              <b className={styles.overlay_text}>Oops... page not found.</b>
            </div>
            <Link to="/" className={styles.intro_btn}> GO TO START </Link>
            </Card>
    )
}
