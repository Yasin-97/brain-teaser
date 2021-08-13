import React from 'react'
import Card from '../components/Card'
import styles from '../css/main.min.module.css'
import Button  from '../components/Button'

export default function Difficulty() {
    return (
        <Card
      className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center}`}
    >
         <div className={styles.header}>
       <h1 className={styles.header_text}>Choose Level</h1>
       </div>
<div className={styles.levels}>
    <Button className={styles.level_Btn} text={'novice'}>
        NOVICE
    </Button>
    <Button className={styles.level_Btn} text={'intermediate'}>
        NOVICE
    </Button>
    <Button className={styles.level_Btn} text={'expert'}>
        NOVICE
    </Button>
    </div>
        </Card>
    )
}
