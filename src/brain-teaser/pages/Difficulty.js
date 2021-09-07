import React,{useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {
  novice,
  intermediate,
  expert,
} from "../phaseDetail/phaseDetail";
import { useDataContext } from '../context/Context'
import Card from '../components/Card'
import styles from '../css/main.min.module.css'
import Button  from '../components/Button'

export default function Difficulty() {

  //context  
    const {getPhaseDifficulty,currentLevel,dispathcSessionStorage,cleanUpState} =useDataContext()
    //router
    const history=useHistory()
    //effects
    useEffect(()=>cleanUpState(),[])
    
    //function
    const dataSaver=(diff)=>{
      getPhaseDifficulty(diff)

      dispathcSessionStorage({
        type:'SET_ITEM',
        payload:{
          item:'phase',
          value:diff
        }
      })
    }    

    
    return (
        <Card
      className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center}`}
    >
         <div className={styles.header}>
       <h1 className={styles.header_text}>Difficulty Level</h1>
       </div>
<div className={styles.levels}>

    <Button className={styles.diff_level_btn} onClick={()=>{
      dataSaver(novice)
      history.push(`/wizard/novice/${currentLevel}/intro`)
      }} text={'novice'}/>

    <Button className={styles.diff_level_btn} onClick={()=>{
       history.push(`/wizard/intermediate/${currentLevel}/intro`)
      dataSaver(intermediate)
      }} text={'intermediate'}/>

    <Button className={styles.diff_level_btn} onClick={()=>{
       history.push(`/wizard/expert/${currentLevel}/intro`)
      dataSaver(expert)
      }} text={'expert'}/>

    </div>
        </Card>
    )
}

