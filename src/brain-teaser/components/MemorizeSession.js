import React,{useState,useEffect} from 'react'
import { useDataContext } from "../context/Context";

import Card from './Card'
import styles from '../css/main.min.module.css'
import Button from "./Button";

export default function MemorizeSession() {
  // console.log('words form the mmmmmmmmmmmmmmmmmmmm',words);


   //context
   const {phase,words,currentLevel,renderMemo,renderOverlay,memoTimeSaver}=useDataContext()
   const {levels}=phase
   const {memoDuration}=levels[currentLevel]
console.log(phase);
    const [counter, setCounter] = useState(levels[currentLevel].memoDuration);//memoDuration

//effects
useEffect(() => {
  let timer;
      if (counter > 0) timer=setTimeout(() =>{
      setCounter((prev) => prev - 1)}, 1000)
      else {
          renderMemo(false)
          renderOverlay(true)
        }
        return ()=>clearTimeout(timer)
  }, [counter]);

    return (
         <Card
   className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_around}`}
    > 
        {/* <div>

      <h1 className={styles.timer}>00:32</h1>
       </div> */}

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
            }}
         duration={counter} text ={'FINISH'}
         
         />
        </div>
        </Card> 
    )
}
