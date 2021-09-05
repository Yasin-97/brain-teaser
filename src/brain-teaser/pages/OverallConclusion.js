import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom"
import { useDataContext } from '../context/Context'
import Button from '../components/Button'
import Card from '../components/Card'
import styles from '../css/main.min.module.css'

export default function OverallConclusion() {
    //context
    const {phase,cleanUpState,dispathcSessionStorage}=useDataContext()
    const {route}=phase
    //router
    const history=useHistory()
    //session storage
    const savedTime=dispathcSessionStorage({type:'GET_ITEM',payload:{item:'overallSavedTime'}})
    const points=dispathcSessionStorage({type:'GET_ITEM',payload:{item:'overallPoints'}})
    const {point,exactitude}=points;
    console.log(savedTime,points);

    return (
        <Card 
        className={`${styles.page} ${styles.d_flex} ${styles.justifyContent_around} ${styles.alignItems_center}`}
      >
           <div className={styles.conclusion_level}><h2>{route}</h2></div>
           <div className={styles.conclusion_levelDetails}>
               <div className={styles.conclusion_levelDetail}><b>Saved time : </b><span className={styles.conclusion_detail_value}>{savedTime} sec</span></div>
               <div className={styles.conclusion_levelDetail}><b>Point : </b><span className={styles.conclusion_detail_value}>{point}</span></div>
           </div>
           <div className={styles.conclusion_action_btns}>
               <Button className={styles.conclusion_nextLevel_btn} onClick={()=>{
                    cleanUpState()
                    dispathcSessionStorage({type:'CLEAR'})
                    history.replace('/difficulty-specify')
               }
                } text={'start over'}/>
           </div>
            
        </Card>
    )
}
