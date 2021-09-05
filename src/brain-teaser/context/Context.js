import React, { createContext, useContext, useState,useEffect,useReducer } from "react";
import {Redirect} from "react-router-dom";

import {wordAPI,wordCollection} from '../assets/word data/wordData'

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
const dispathcSessionStorage=(action)=>{
  const {type,payload}=action
  switch(type){
    case 'SET_ITEM':
      return(sessionStorage.setItem(payload.item,JSON.stringify(payload.value)))
      case 'GET_ITEM':
        return JSON.parse(sessionStorage.getItem(payload.item))
      case 'REMOVE':
        return(sessionStorage.removeItem(payload.item))
      case 'CLEAR':
        return(sessionStorage.clear())

        default :
        return ;
  }
}



const sotragePhase=JSON.parse(sessionStorage.getItem('phase'))
const storagewords=JSON.parse(sessionStorage.getItem('words'))
const storageCurrentLevel= JSON.parse(sessionStorage.getItem('currentLevel'))
const storageMemoSavedTime=JSON.parse(sessionStorage.getItem('memoSavedTime'))
const storageRememSavedTime=JSON.parse(sessionStorage.getItem('rememSavedTime'))
  //state
  const [phase, setPhase] = useState(sotragePhase);
  const [currentLevel, setCurrentLevel] = useState( storageCurrentLevel || 0)
  const [words,setWords]=useState( storagewords||null)
  const [memoSavedTime, setMemoSavedTime]=useState(storageMemoSavedTime)
  const [rememSavedTime, setRememSavedTime]=useState(storageRememSavedTime)
  const [levelPoints, setLevelPoints] = useState();
  const [isOnline, setIsOnline] = useState(true);
  
  // console.log('phase',phase);
  console.log('currentLevel',currentLevel);
  console.log('words',words);
  // console.log('memosavedTime',memoSavedTime);
  // console.log('rememSavedTime',reme/mSavedTime);
  // console.log('levelPoints',levelPoints);
useEffect(()=>{
  console.log('show mee thing of restulet',phase,storagewords);
  if(phase&&storagewords==null){
    console.log('this ran now');
    const levelWords=[]
    const checkNET=navigator.onLine
    new Promise((res,rej)=>{
      if(checkNET){
        console.log('runnign with',phase,currentLevel,phase.levels[currentLevel].wordCollection);
        for(let i=0;i<phase.levels[currentLevel].wordCollection;i++){
      res(levelWords.push(wordAPI().then(res=>res[0].word)))
    }
  }
    else rej(setInternetConnection(false),console.log('this request rejected'))
    
  }
  )



Promise.all(levelWords).then(res=>{
  const iterate=res.map((w,i)=>{return{id:i.toString(),word:w}});
  setWords(iterate)
  dispathcSessionStorage({type:"SET_ITEM",payload:{item:'words',value:iterate}})
}).catch(err=>console.log(err))
  }
  },[phase,currentLevel])


  //function
  const getPhaseDifficulty = (diff) => setPhase(diff)
  const clearWords=()=>setWords(null)
  const memoTimeSaver=(time)=>setMemoSavedTime(time)
  const rememTimeSaver=(time)=>setRememSavedTime(time)
  const getLevelPoints = (points) => setLevelPoints(points);
  const setInternetConnection = (bool) => setIsOnline(bool);
  const setNextLevel = () => {
    setCurrentLevel(pre=>pre+1)
    sessionStorage.setItem('currentLevel',JSON.stringify(currentLevel+1))
  };
  function shuffle(array,num) {
    let currentIndex = array.length;
    let randomIndex;
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

  const cleanUpState=()=>{
    setPhase(null)
    setWords(null)
    dispathcSessionStorage({type:'CLEAR'})
    setCurrentLevel(0)
    setLevelPoints(null)
    setMemoSavedTime(null)
    setRememSavedTime(null)

  }




  const value = {
    //states
    words,
    phase,
    memoSavedTime,
    rememSavedTime,
    currentLevel,
    levelPoints,
    isOnline,

    //functions
    cleanUpState,
    clearWords,
    setInternetConnection,
    dispathcSessionStorage,
    getPhaseDifficulty,
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
