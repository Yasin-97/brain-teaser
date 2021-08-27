import React,{useState,useEffect} from 'react'
import {useHistory,useLocation} from "react-router-dom";
import { useDataContext } from "../context/Context";

import Card from './Card'
import styles from '../css/main.min.module.css'
import Button from "./Button";

export default function MemorizeSession() {
const history=useHistory()
//get session storaged time
const memoContinued=JSON.parse(sessionStorage.getItem('memoContinued'))
// const memoContinued=JSON.parse(sessionStorage.getItem('memoContinued'))



   //context
   const {phase,words,currentLevel,renderMemo,renderOverlay,memoTimeSaver}=useDataContext()
   const {route,levels}=phase

   //state
    const [counter, setCounter] = useState(memoContinued?memoContinued:levels[currentLevel].memoDuration);

    //effects
// useEffect(()=>{
// //chunk the url, add current level num and the componente's path, concat the url
//   const updated=pathname.split('/')
//   const concated=updated.reduce((acc,cur,index)=>{
//     if(index===3)cur=currentLevel
//     if(index===4)cur='memo'
//     return acc.concat(`/${cur}`)  
//   })
//   history.replace(concated)
// },[currentLevel])


useEffect(() => {
  let timer;
      if (counter > 0){ timer=setTimeout(() =>{
      setCounter((prev) => prev - 1)}, 1000)
      sessionStorage.setItem('memoContinued',JSON.stringify(counter))
    }
      else {
        memoTimeSaver(counter)
          renderMemo(false)
          renderOverlay(true)
          history.replace(`/wizard/${route}/${currentLevel}/overlay`)
          sessionStorage.removeItem('memoContinued')
        }
        return ()=>clearTimeout(timer)
  }, [counter]);

  


    return (
         <Card
   className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_around}`}
    > 
        <div>
        <h1 className={styles.wizard_memo_header}>Remember the order</h1>  
             <div className={styles.wizard_memo_collection}>
             {words.map(({id,word})=> <p className={styles.wizard_memo_word} key={id}>{word}</p>)}
            
        </div>
        </div> 
         <div>
        <Button className={styles.wizard_Btn}
        onClick={()=>{
          
             memoTimeSaver(counter) 
             renderMemo(false)
             renderOverlay(true)
             history.replace(`/wizard/${route}/${currentLevel}/overlay`)
             sessionStorage.removeItem('memoContinued')
            }}
         duration={counter} text ={'FINISH'}
         
         />
        </div>
        </Card> 
    )
}
