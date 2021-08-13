import React,{useState} from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import styles from '../css/main.min.module.css'

export default function Conclusion() {
    return (
        <Card 
        className={`${styles.page} ${styles.d_flex} ${styles.justifyContent_around} ${styles.alignItems_center}`}
      >
           <div style={{position:'relative',
           background: 'black',
        zIndex:10
        }} className={styles.conclusion_level}><h2>Level 1</h2></div>
           <div className={styles.conclusion_levelDetails}>
               <div className={styles.conclusion_levelDetail}><b>Saved time : </b><span>10 sec</span></div>
               <div className={styles.conclusion_levelDetail}><b>Exactitude : </b><span>58%</span></div>
               <div className={styles.conclusion_levelDetail}><b>Point : </b><span>8/10</span></div>
               <div  className={styles.conclusion_stars}><b>* * * * * </b></div>
           </div>
           <div className={styles.conclusion_action_btns}>
               <Button className={styles.conclusion_nextLevel_btn} text={'LEVEL 2'}/>
               <Button className={styles.conclusion_quit_btn} text={'QUIT'}/>
           </div>
            
        </Card>
    )
}
