import React, { useState,useEffect } from "react";
import WizardIntro from '../components/WizardIntro'
import RememberSession from "../components/RememberSession";
import MemorizeSession from '../components/MemorizeSession'
import Overlay from '../components/Overlay'
export default function Wizard() {
  const [getPlaying, setGetPlaying] = useState(false);
  const [renderIntro, setRenderIntro] = useState(true);
  const [memoTime,setMemoTime]=useState()

console.log('memo is now',memoTime);
  const noIntroRender=(isTrue)=>{
    setRenderIntro(isTrue)
  }
  const words = [
    { id: '0', word: "man" },
    { id: '1', word: "woman" },
    { id: '2', word: "kid" },
    { id: '3', word: "Harry potter" },
    { id: '4', word: "overWhelmed" },
    { id: '5', word: "mindfullness" },
  ];

const levelsDetails={
  difficulty:'hard',
  introDescription:"hard difficulty is a chain of 15 levels",
  level1:{
    level:1,
    wordColection:words,
    memoDuration:19,
    rememDuration:21,
    exactitudePercentage:0,
    savedtime: 0,
    point:0/10,
    rate:0
  }
}
 
 return <Overlay />
// if(memoTime===0) return <RememberSession time={18} words={words} level={5} />
//  else if(renderIntro===false) return <MemorizeSession durationEnd={(duration)=>setMemoTime(duration)} /> 
//  else if(renderIntro===true)return <WizardIntro description={levelsDetails.introDescription} renderIntroOver={noIntroRender} />
}
