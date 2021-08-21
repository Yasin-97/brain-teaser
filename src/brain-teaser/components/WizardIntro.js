import React from 'react'
import { useDataContext } from "../context/Context";
import Button from './Button'
import Card from './Card'
import styles from '../css/main.min.module.css'

export default function WizardIntro() {
   const {phase,renderIntro,renderMemo}=useDataContext()

   const {introDescription}=phase

    return (
        <Card
            className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_center}`}
            >
                 <div className={styles.wizard_intro}>
        <h2 className={styles.wizard_intro_header}>just a simpole intor</h2>
        <p className={styles.wizard_intro_text}> {introDescription} In the given time try to memorize the words and their order then 
            they get unorderd and you gonna get them back tidy
        </p>
        <Button className={styles.wizard_Btn} onClick={()=>{
            renderMemo(true)
            renderIntro(false)
            
            }} text={'GET GOING'}/>
                 </div>
                    
                </Card>
    )
}
