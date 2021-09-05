import React,{useEffect} from 'react'
import { useDataContext } from "../context/Context";
import {useHistory} from "react-router-dom";
import styled from 'styled-components'
import styles from '../css/main.min.module.css'
import Card from './Card'
import Button from './Button'

// const OverlayContainer =styled.div`
// position: fixed;
//     display: ${props=>props.showOverlay?'none':'flex'};
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: rgba(0,0,0,0.5);
//     z-index: 2;
// `



export default function Overlay() {
    const history=useHistory()

    // useEffect(()=>history.push(`overlay`),[])

  const {phase,currentLevel,memoSavedTime,dispathcSessionStorage}=useDataContext()

  const savedTime=
  dispathcSessionStorage({
    type:"GET_ITEM",
    payload:{
      item:'memoSavedTime'
    }
  })
//   JSON.parse(sessionStorage.getItem('memoSavedTime'))
  if(!savedTime)
  dispathcSessionStorage({
    type:'SET_ITEM',
    payload:{
      item:'memoSavedTime',
      value:memoSavedTime
    }
  })
//   sessionStorage.setItem('memoSavedTime',memoSavedTime)

const {route}=phase
    return (
        // <OverlayContainer>
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
        // </OverlayContainer>
    )
}
