import React,{useEffect} from 'react'
import { useHistory } from 'react-router';
import { useDataContext } from "../context/Context";
import Button from './Button'
import Card from './Card'
import styles from '../css/main.min.module.css'

export default function WizardIntro() {
    const history=useHistory()
   const {phase,currentLevel,sessionStorageState,dispathcSessionStorage}=useDataContext()
   
   const {route,introDescription}=phase
//    useEffect(()=>{history.push(`memo`)},[])
    return (
        <Card
            className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_center}`}
            >
                 <div className={styles.wizard_intro}>
        <h2 className={styles.wizard_intro_header}>just an introduction</h2>
        <p className={styles.wizard_intro_text}> {introDescription} In the given time try to memorize the words and its order.
        </p>
                 </div>
        <Button className={styles.wizard_intro_btn} onClick={()=>{
              history.replace(`/wizard/${route}/${currentLevel}/memo`)
            }} text={'GET GOING'}/>
                    
                </Card>
    )
}
