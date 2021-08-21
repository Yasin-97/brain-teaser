import React, { createContext, useContext, useState,useEffect } from "react";
import {
  novice,
  intermediate,
  expert,
} from "../phaseDetail/phaseDetail";
import {wordCollection} from '../assets/word data/wordData'


const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  //state
  const [phase, setPhase] = useState();
  const [currentLevel, setCurrentLevel] = useState(0)
  const [words,setWords]=useState()
  const [isRenderIntro,setisRenderIntro]=useState(true)
  const [isRenderMemo,setIsRenderMemo]=useState(false)
  const [isRenderOverlay,setIsRenderOverlay]=useState(false)
  const [isRenderRemem,setIsRenderRemem]=useState(false)
  const [isRenderConclusion,setIsRenderConclusion]=useState(false)
  // const [isRememTimeEnded,setIsRememTimeEnded]=useState(false)
  const [memoSavedTime,setMemoSavedTime]=useState()
  const [rememSavedTime,setRememSavedTime]=useState()
  const [levelPoints, setLevelPoints] = useState();
  
  // const [introDescription,setIntroDescription]=useState()
  // const [memoDuration,setMemoDuration]=useState()
  // const [rememDuration,setRememDuration]=useState()

  //effects
  useEffect(()=>{
    phase&&setWords(shuffle(wordCollection,phase.levels[currentLevel].wordCollection))
    
    },[phase])

  //function
  const getPhaseDifficulty = (diff) => {
    switch (diff) {
      case 1:
        setPhase(novice);
        break;
      case 2:
        setPhase(intermediate);
        break;
      case 3:
        setPhase(expert);
        break;
      default:
        break;
    }
  };
  const renderIntro=(bool)=>setisRenderIntro(bool)
  const renderMemo=(bool)=>setIsRenderMemo(bool)
  const renderOverlay=(bool)=>setIsRenderOverlay(bool)
  const renderRemem=(bool)=>setIsRenderRemem(bool)
  const renderConclusion=(bool)=>setIsRenderConclusion(bool)
const memoTimeSaver=(time)=>setMemoSavedTime(time)
const rememTimeSaver=(time)=>setRememSavedTime(time)
  // const memoTimeEnded=(bool)=>setIsMemoTimeEnded(bool)
  // const rememTimeEnded=(bool)=>setIsRememTimeEnded(bool)
  const setNextLevel = () => setCurrentLevel((pre) => pre + 1);
  const getLevelPoints = (points) => setLevelPoints(points);

  function shuffle(array,num) {
    let currentIndex = array.length;
    let randomIndex;
    let newArr=[];
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    
    return array.slice(0,num)
  }

  const arraySimilarity = (arr1, arr2) => {
    const inCommon = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) inCommon.push(arr1[i]);
    }
    return {
      exactitude: ((inCommon.length / arr1.length) * 100).toFixed(),
      point: inCommon.length + "/" + arr1.length,
    };
  };




  const value = {
    //states
    words,

    phase,
    isRenderIntro,
    isRenderMemo,
    isRenderOverlay,
    isRenderRemem,
    isRenderConclusion,
    memoSavedTime,
    rememSavedTime,
    // isMemoTimeEnded,
    // isRememTimeEnded,
    currentLevel,
    levelPoints,

    //functions
    getPhaseDifficulty,
    renderIntro,
    renderMemo,
    renderOverlay,
    renderRemem,
    renderConclusion,
    memoTimeSaver,
    rememTimeSaver,
    // memoTimeEnded,
    // rememTimeEnded,
    getLevelPoints,
    setNextLevel,
    shuffle,
    arraySimilarity,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
