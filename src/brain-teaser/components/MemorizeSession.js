import React from 'react'
import Card from './Card'
import styles from '../css/main.min.module.css'
import Button from "./Button";

export default function MemorizeSession({durationEnd}) {
    return (
         <Card
   className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center} ${styles.justifyContent_around}`}
    > 
        <div>

      <h1 className={styles.timer}>00:32</h1>
       </div>

        <div>
        <h1 className={styles.wizard_memo_header}>Remember the order</h1>  
             <div className={styles.wizard_memo_collection}>
           <p className={styles.wizard_memo_word}>yan</p>
            <p className={styles.wizard_memo_word}>ywersdasin</p>
            <p className={styles.wizard_memo_word}>yasin</p>
            <p className={styles.wizard_memo_word}>yassdf weew3wsein</p>
            <p className={styles.wizard_memo_word}>yasdsdfew34fwesin</p>
           
            
        </div>
        </div> 
         <div>
        <Button className={styles.wizard_Btn} onClick={()=>{}}
         duration={18} text ={'FINISH'}
         durationEnd={(duration)=>durationEnd(duration)}
         />
        </div>
        </Card> 
    )
}
