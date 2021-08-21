import React from 'react'
import {Link} from 'react-router-dom'
import { useDataContext } from '../context/Context'
import Card from '../components/Card'
import styles from '../css/main.min.module.css'
import Button  from '../components/Button'

export default function Difficulty() {
    const {getPhaseDifficulty} =useDataContext()
    
    return (
        <Card
      className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center}`}
    >
         <div className={styles.header}>
       <h1 className={styles.header_text}>Difficulty Level</h1>
       </div>
<div className={styles.levels}>
<Link to="/wizard">
    <Button className={styles.level_Btn} onClick={()=>getPhaseDifficulty(1)} text={'novice'}/>
    </Link>
    <Link to="/wizard">
    <Button className={styles.level_Btn} onClick={()=>getPhaseDifficulty(2)} text={'intermediate'}/>
    </Link>
    <Link to="/wizard">
    <Button className={styles.level_Btn} onClick={()=>getPhaseDifficulty(3)} text={'expert'}/>
    </Link>
    </div>
        </Card>
    )
}
