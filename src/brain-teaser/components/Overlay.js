import React,{useEffect} from 'react'
import { useDataContext } from "../context/Context";
import {useHistory} from "react-router-dom";
import styled from 'styled-components'
import styles from '../css/main.min.module.css'
import Button from './Button'

const OverlayContainer =styled.div`
position: fixed;
    display: ${props=>props.showOverlay?'none':'flex'};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
`



export default function Overlay() {
    const history=useHistory()

    // useEffect(()=>history.push(`overlay`),[])

  const {phase,currentLevel,memoSavedTime,renderOverlay,renderRemem}=useDataContext()
const {route}=phase
    return (
        <OverlayContainer>
            <div className={styles.overlay_content}>
                <h4 className={styles.overlay_header}>Ready to keep going ?</h4>
                {memoSavedTime!==0&&<p className={styles.overlay_text}> Nice in the previous part you svaed {memoSavedTime}sec, so it gonna be added to next part's time!</p>}
                <p className={styles.overlay_text}>In the next part those words are unorderd, Get them back in order as previous part!</p>

                <Button className={styles.action_Btn} text={'GET GOING'} onClick={()=>{ 
                    history.replace(`/wizard/${route}/${currentLevel}/remem`)
                    renderOverlay(false)
                    renderRemem(true)}}/>
            </div>
            
        </OverlayContainer>
    )
}
