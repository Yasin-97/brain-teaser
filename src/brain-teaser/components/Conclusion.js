import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom"
import { useDataContext } from '../context/Context'
import Button from './Button'
import Card from './Card'
import styles from '../css/main.min.module.css'

export default function Conclusion() {
    //router
    const history=useHistory()
    
    //context
    const {phase,currentLevel, rememSavedTime,levelPoints, setNextLevel,renderIntro,renderMemo,renderConclusion}=useDataContext()
    const {route}=phase
    //destruction
    const {exactitude,point}=levelPoints

    //effect
    // useEffect(()=>{history.push(`conclusion`)},[])
    
    

useEffect(()=>{
    //session storage
// {if(!sessionStorage.getItem('phase')){
//     sessionStorage.setItem('phase',JSON.stringify(phase.difficulty))
// }
// else if(sessionStorage.getItem('phase')){
//     const savedPhase=JSON.stringify(sessionStorage.getItem('phase'))
//     savedPhase!==phase.difficulty&&sessionStorage.setItem('phase',JSON.stringify(phase.difficulty))
// }}

   {
        if(sessionStorage.getItem('overall saved time')){
    const lastSavedTime=JSON.parse(sessionStorage.getItem('overall saved time'))
    sessionStorage.setItem('overall saved time',JSON.stringify((+lastSavedTime)+(+rememSavedTime)))
}
else sessionStorage.setItem('overall saved time',JSON.stringify(rememSavedTime))
}

{
        if(sessionStorage.getItem('overall point')){
        const lastOverallPoint=sessionStorage.getItem('overall point')
                const[newGainedPoint,newTotalPoint]=point.split('/')
                const[lastGainedPoint,lastTotalPoint]=JSON.parse(lastOverallPoint).split('/')
                sessionStorage.setItem('overall point',JSON.stringify((+lastGainedPoint + +newGainedPoint)+'/'+(+lastTotalPoint + +newTotalPoint)))
        }
else sessionStorage.setItem('overall point',JSON.stringify(point))
}

sessionStorage.setItem('last level',JSON.stringify(currentLevel))
},[])
    return (
        <Card 
        className={`${styles.page} ${styles.d_flex} ${styles.justifyContent_around} ${styles.alignItems_center}`}
      >
           <div className={styles.conclusion_level}><h2>Level {currentLevel+1}</h2></div>
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
                history.replace(`/wizard/${route}/${currentLevel+1}/memo`)
               }
                } text={'Next Level'}/>
               <Button className={styles.conclusion_quit_btn} onClick={()=>{ 
                   renderIntro(true)
                renderConclusion(false)
                sessionStorage.clear()
                history.replace('/')
                   }} text={'QUIT'}/>
           </div>
            
        </Card>
    )
}