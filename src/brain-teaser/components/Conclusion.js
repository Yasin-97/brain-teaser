import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../context/Context";
import Button from "./Button";
import Card from "./Card";
import styles from "../css/main.min.module.css";

export default function Conclusion() {
  
  //context
  const { phase, currentLevel,  clearWords, setNextLevel,dispathcSessionStorage } = useDataContext();//levelPoints
  const { route, levels } = phase;
  
  //state
  const [isLastLevel]=useState(currentLevel + 1 === levels.length)
  
        //session storage
        const levelPoints=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'currentLevelPoints' } })
        const currentSavedTime=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'currentSavedTime' } })
        const overallPoints=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'overallPoints' } })
        const overallSavedTime=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'overallSavedTime' } })
  
      //effect
    useEffect(() => {
      
      // {
      //   if (!overallPoints) dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'overallPoints', value:levelPoints }})
      //   else {
      //     const [newGainedPoint, newTotalPoint] = overallPoints.point.split("/");
      //     const [lastGainedPoint, lastTotalPoint] = levelPoints.point.split("/");
      //     const GainedPoint = +newGainedPoint + +lastGainedPoint;
      //     const TotalPoint = +newTotalPoint + +lastTotalPoint;
      //     dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'overallPoints',value:{
      //           exactitude: ((GainedPoint / TotalPoint) * 100).toFixed(),
      //           point: GainedPoint + "/" + TotalPoint,
      //         }}})
      //   }
      // }

      // {
      // if (!overallSavedTime) dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'overallSavedTime', value:rememSavedTime }})
      // else dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'overallSavedTime', value:overallSavedTime + rememSavedTime }})
      // }
      
    }, []);

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

    //router
  const history = useHistory();

  //session storage
  // const currentLevelPoints=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'currentLevelPoints' } })
  // const currentSavedTime=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'currentSavedTime' } })
  
  //destruction
  const SavedTime = currentSavedTime;
  const exactitude =  levelPoints.exactitude// : currentLevelPoints.exactitude;
  const point =  levelPoints.point// : currentLevelPoints.point;


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
          onClick={() => {
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
          }}
          text={isLastLevel ? "conclusion" : "Next Level"}
        />
        <Button
          className={styles.conclusion_quit_btn}
          onClick={() => {
            dispathcSessionStorage({ type:"CLEAR"})
            history.replace("/");
          }}
          text={"QUIT"}
        />
      </div>
    </Card>
  );
}
