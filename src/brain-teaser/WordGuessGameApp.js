import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route} from "react-router-dom";
import Intro from './pages/Intro'
import Difficulty from './pages/Difficulty'
import Wizard from './pages/Wizard'
import Conclusion from './pages/Conclusion'

import styles from './css/main.min.module.css'
import img from './assets/img/pexels-andre-moura-4021521.jpg'

export default function WordGuessGameApp() {
    return (
        <div className={`${styles.mainPage} ${styles.d_flex} ${styles.justifyContent_center}`}>
           <div className={styles.background_container}>
           <img src={img} />
           </div>
           <Router>
           <Switch>
           <Route exact path="/" component={Intro} />
           <Route exact path="/difficulty-specify" component={Difficulty} />
           <Route exact path="/wizard" component={Wizard} />
           <Route exact path="/conclusion" component={Conclusion} />
</Switch>
</Router>
        </div>
    )
}
