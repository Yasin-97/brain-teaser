import React from 'react'
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



export default function Overlay({isRememRender,savedTime}) {
    return (
        <OverlayContainer>
            <div className={styles.overlay_content}>
                <h4 className={styles.overlay_header}>Memorization time is finished</h4>
                <p className={styles.overlay_text}> So now let's get them back in order !{savedTime}</p>
                <p className={styles.overlay_text}> you saved 10sec,so you got 29 sec to reorder them back</p>

                <Button className={styles.action_Btn} text={'GET GOING'} onClick={()=>isRememRender(true)}/>
            </div>
            
        </OverlayContainer>
    )
}
