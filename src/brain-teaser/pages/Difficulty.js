import React,{useEffect,useState} from 'react'
import {Link,useParams,useLocation,useRouteMatch,withRouter,useMa} from 'react-router-dom'
import {
  novice,
  intermediate,
  expert,
} from "../phaseDetail/phaseDetail";
import { useDataContext } from '../context/Context'
import Card from '../components/Card'
import styles from '../css/main.min.module.css'
import Button  from '../components/Button'

export default function Difficulty() {

  //context  
    const {getPhaseDifficulty,currentLevel} =useDataContext()
    
    //effects
    // useEffect(()=>sessionStorage.clear(),[])
    
    //function
    const dataSaver=(diff)=>{
      getPhaseDifficulty(diff)
      sessionStorage.setItem('phase',JSON.stringify(diff))
    }    

    
    return (
        <Card
      className={`${styles.page} ${styles.d_flex} ${styles.alignItems_center}`}
    >
         <div className={styles.header}>
       <h1 className={styles.header_text}>Difficulty Level</h1>
       </div>
<div className={styles.levels}>
<Link to={`/wizard/novice/${currentLevel}/intro`}>
    <Button className={styles.level_Btn} onClick={()=>dataSaver(novice)} text={'novice'}></Button>
    </Link>
    <Link to={`/wizard/intermediate/${currentLevel}/intro`}>
    <Button className={styles.level_Btn} onClick={()=>dataSaver(intermediate)} text={'intermediate'}></Button>
    </Link>
    <Link to={`/wizard/expert/${currentLevel}/intro`}>
    <Button className={styles.level_Btn} onClick={()=>dataSaver(expert)} text={'expert'}></Button>
    </Link>
    </div>
        </Card>
    )
}

// export default withRouter(Difficulty);
