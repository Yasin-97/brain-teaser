import React from 'react'
import { useDataContext } from "../context/Context";
import {useHistory} from "react-router-dom";
import styles from '../css/main.min.module.css'
import Card from './Card'
import Button from './Button'


export default function Overlay() {
  
  //context
  const {phase,currentLevel,memoSavedTime,dispathcSessionStorage}=useDataContext()
  const {route}=phase

  //history
    const history=useHistory()

    //storage
  const savedTime=
  dispathcSessionStorage({
    type:"GET_ITEM",
    payload:{
      item:'memoSavedTime'
    }
  })

  if(!savedTime)
  dispathcSessionStorage({
    type:'SET_ITEM',
    payload:{
      item:'memoSavedTime',
      value:memoSavedTime
    }
  })

    return (
           <Card
            className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_center}`}
            >
            <div className={styles.overlay_content}>
                <h4 className={styles.overlay_header}>keep going ?</h4>
                {memoSavedTime!==0&&<p className={styles.overlay_text}> Nice in the previous part you svaed <span className={styles.overlay_sec}>{savedTime}sec</span>, so it gonna be added to next part's time!</p>}
                <p className={styles.overlay_text}>In the next part those words are unorderd, Get them back in order as previous part !</p>
            </div>
                <Button className={styles.wizard_overlay_btn} text={'GET GOING'} onClick={()=>{
                    history.replace(`/wizard/${route}/${currentLevel}/remem`)
                    }}/>
            </Card>
    )
}
