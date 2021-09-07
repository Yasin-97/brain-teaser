import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../context/Context";
import Button from "./Button";
import Card from "./Card";
import styles from "../css/main.min.module.css";

export default function Conclusion() {
  
  //context
  const { phase, currentLevel,  clearWords, setNextLevel,dispathcSessionStorage } = useDataContext();//levelPoints
  const { route, levels } = phase;

      //router
      const history = useHistory();
  
  //state
  const [isLastLevel]=useState(currentLevel + 1 === levels.length)
  
        //session storage
        const levelPoints=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'currentLevelPoints' } })
        const currentSavedTime=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'currentSavedTime' } })
        const overallPoints=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'overallPoints' } })
        const overallSavedTime=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'overallSavedTime' } })
  

    const setOverallData=()=>{
      {
        if (!overallPoints) dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'overallPoints', value:levelPoints }})
        else {
          const [newGainedPoint, newTotalPoint] = overallPoints.point.split("/");
          const [lastGainedPoint, lastTotalPoint] = levelPoints.point.split("/");
          const GainedPoint = +newGainedPoint + +lastGainedPoint;
          const TotalPoint = +newTotalPoint + +lastTotalPoint;
          dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'overallPoints',value:{
                exactitude: ((GainedPoint / TotalPoint) * 100).toFixed(),
                point: GainedPoint + "/" + TotalPoint,
              }}})
        }
      }

      {
      if (!overallSavedTime) dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'overallSavedTime', value:currentSavedTime }})
      else dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'overallSavedTime', value:overallSavedTime + currentSavedTime }})
      }
    }


  //destruction
  const SavedTime = currentSavedTime;
  const exactitude =  levelPoints.exactitude
  const point =  levelPoints.point


  //function
  const nextButtonActoin=()=>{
    setOverallData()
    if(isLastLevel) history.replace('/overall-conclusion')
   else {
    dispathcSessionStorage({ type:"SET_ITEM", payload:{ item:'words',value:null}})
        setNextLevel()
        history.replace(`/wizard/${route}/${currentLevel + 1}/memo`)
  }
    dispathcSessionStorage({ type:"REMOVE", payload:{ item:'currentLevelPoints'}})
    dispathcSessionStorage({ type:"REMOVE", payload:{ item:'currentSavedTime'}})
    dispathcSessionStorage({ type:"REMOVE", payload:{ item:'words'}})
    clearWords()
  }
  
  const quitButuonAction=()=>{
    dispathcSessionStorage({ type:"CLEAR"})
    history.replace("/");
  }

  return (
    <Card
      className={`${styles.page} ${styles.d_flex} ${styles.justifyContent_around} ${styles.alignItems_center}`}
    >
      <div className={styles.conclusion_level}>
        <h2>Level {currentLevel + 1}</h2>
      </div>
      <div className={styles.conclusion_levelDetails}>
        <div className={styles.conclusion_levelDetail}>
          <b>Saved time : </b>
          <span className={styles.conclusion_detail_value}>{SavedTime} sec</span>
        </div>
        <div className={styles.conclusion_levelDetail}>
          <b>Exactitude : </b>
          <span className={styles.conclusion_detail_value}>{exactitude}%</span>
        </div>
        <div className={styles.conclusion_levelDetail}>
          <b>Point : </b>
          <span className={styles.conclusion_detail_value}>{point}</span>
        </div>
      </div>
      <div className={styles.conclusion_action_btns}>
        <Button
          className={styles.conclusion_nextLevel_btn}
          onClick={() => nextButtonActoin()}
          text={isLastLevel ? "conclusion" : "Next Level"}
        />
        <Button
          className={styles.conclusion_quit_btn}
          onClick={() => quitButuonAction()}
          text={"QUIT"}
        />
      </div>
    </Card>
  );
}
