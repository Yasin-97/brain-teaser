import React, { createContext, useContext, useState,useEffect,useReducer } from "react";
import {useHistory} from "react-router-dom";

import {wordCollection} from '../assets/word data/wordData'


//redicer function
const sessionStorageReducer=(state,action)=>{
  const {type,payload}=action
  const {item,value}=payload
  switch(type){
    case 'SET_ITEM':
      return(sessionStorage.setItem(item,JSON.stringify(value)))
      case 'GET_ITEM':
        return(JSON.parse(sessionStorage.getItem(item)))
      case 'REMOVE':
        return(sessionStorage.removeItem(item))
      case 'CLEAR':
        return(sessionStorage.clear())

        default :
        return ;
  }
}




const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
//reducer
const [sesstionStorageState,dispathcSessionStorage]= useReducer(sessionStorageReducer, {item:'',value:''})


  //state
  const [phase, setPhase] = useState(JSON.parse(sessionStorage.getItem('phase')));
  const [currentLevel, setCurrentLevel] = useState(0)
  const [words,setWords]=useState(JSON.parse(sessionStorage.getItem('words')))
  const [isRenderIntro, setisRenderIntro]=useState(true)
  const [isRenderMemo, setIsRenderMemo]=useState(false)
  const [isRenderOverlay, setIsRenderOverlay]=useState(false)
  const [isRenderRemem, setIsRenderRemem]=useState(false)
  const [isRenderConclusion, setIsRenderConclusion]=useState(false)
  const [memoSavedTime, setMemoSavedTime]=useState()
  const [rememSavedTime, setRememSavedTime]=useState()
  const [levelPoints, setLevelPoints] = useState();
  
  // const [introDescription,setIntroDescription]=useState()
  // const [memoDuration,setMemoDuration]=useState()
  // const [rememDuration,setRememDuration]=useState()

  //effects
 
// console.log(phase);
// useEffect(()=>{
// const savedPhase=JSON.parse(sessionStorage.getItem('phase'))
// console.log(savedPhase);
// savedPhase&&setPhase(savedPhase)
// },[])

useEffect(()=>{
  let words;
  if(phase){
words=shuffle(wordCollection,phase.levels[currentLevel].wordCollection);
console.log(words);
    setWords(words);
  sessionStorage.setItem('words',JSON.stringify(words));
  }
  },[phase,currentLevel])

  //function

  const getPhaseDifficulty = (diff) => setPhase(diff)
  const renderIntro=(bool)=>setisRenderIntro(bool)
  const renderMemo=(bool)=>setIsRenderMemo(bool)
  const renderOverlay=(bool)=>setIsRenderOverlay(bool)
  const renderRemem=(bool)=>setIsRenderRemem(bool)
  const renderConclusion=(bool)=>setIsRenderConclusion(bool)
  const memoTimeSaver=(time)=>setMemoSavedTime(time)
  const rememTimeSaver=(time)=>setRememSavedTime(time)
  const setNextLevel = () => {
  const lastLevel=parseInt(sessionStorage.getItem('last level'))
      setCurrentLevel(lastLevel + 1)
  };


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
    currentLevel,
    levelPoints,
    sesstionStorageState,

    //functions
    dispathcSessionStorage,
    getPhaseDifficulty,
    renderIntro,
    renderMemo,
    renderOverlay,
    renderRemem,
    renderConclusion,
    memoTimeSaver,
    rememTimeSaver,
    getLevelPoints,
    setNextLevel,
    shuffle,
    arraySimilarity,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
