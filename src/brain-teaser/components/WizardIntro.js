import React from 'react'
import Button from './Button'
import Card from './Card'
import styles from '../css/main.min.module.css'

export default function WizardIntro({getPlaying}) {
    return (
        <Card
            className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_center}`}
            >
                 <div className={styles.wizard_intro}>
        <h2 className={styles.wizard_intro_header}>just a simpole intor</h2>
        <p className={styles.wizard_intro_text}>In the given time try to memorize the words and their order then 
            they get unorderd and you gonna get them back tidy
        </p>
        <Button className={styles.wizard_Btn} onClick={()=>getPlaying(true)} text={'GET GOING'}/>
                 </div>
                    
                </Card>
    )
}
