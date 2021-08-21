import React,{useState} from 'react'
import { Link, useHistory } from "react-router-dom"
import { useDataContext } from '../context/Context'
import Button from './Button'
import Card from './Card'
import styles from '../css/main.min.module.css'

export default function Conclusion() {
    const history=useHistory()
    const {rememSavedTime,levelPoints, setNextLevel,renderIntro,renderMemo,renderConclusion}=useDataContext()
    const {exactitude,point}=levelPoints
    console.log('dev man come shere',levelPoints)
    return (
        <Card 
        className={`${styles.page} ${styles.d_flex} ${styles.justifyContent_around} ${styles.alignItems_center}`}
      >
           <div style={{position:'relative',
           background: 'black',
        zIndex:10
        }} className={styles.conclusion_level}><h2>Level 1</h2></div>
           <div className={styles.conclusion_levelDetails}>
               <div className={styles.conclusion_levelDetail}><b>Saved time : </b><span>{rememSavedTime} sec</span></div>
               <div className={styles.conclusion_levelDetail}><b>Exactitude : </b><span>{exactitude}%</span></div>
               <div className={styles.conclusion_levelDetail}><b>Point : </b><span>{point}</span></div>
               <div  className={styles.conclusion_stars}><b>* * * * * </b></div>
           </div>
           <div className={styles.conclusion_action_btns}>
               <Button className={styles.conclusion_nextLevel_btn} onClick={()=>{
                setNextLevel()
                renderMemo(true)
                renderConclusion(false)
               }
                } text={'Next Level'}/>
               <Button className={styles.conclusion_quit_btn} onClick={()=>{ 
                   renderIntro(true)
                renderConclusion(false)
                history.push('/')
                   }} text={'QUIT'}/>
           </div>
            
        </Card>
    )
}