import React, { useState,useEffect } from "react";
import {Route, Switch,useHistory,useLocation} from "react-router-dom";
import { useDataContext } from "../context/Context";
//components
import WizardIntro from "../components/WizardIntro";
import RememberSession from "../components/RememberSession";
import MemorizeSession from "../components/MemorizeSession";
import Conclusion from "../components/Conclusion";
import Overlay from "../components/Overlay";


export default function Wizard() {

  //router
  const history=useHistory()
  const location=useLocation()
 


//context
const {
  dispathcSessionStorage,
  sesstionStorageState,
  phase,
  currentLevel,
}=useDataContext()

//effects
//set then get the current path to redirect to the same component, in the case user update or refresh the page

useEffect(()=>sessionStorage.setItem('currentPath',JSON.stringify(location.pathname)),[location.pathname])
useEffect(()=>history.replace(JSON.parse(sessionStorage.getItem('currentPath'))),[location.pathname])
console.log(location.pathname);
// useEffect(()=>{
//   dispathcSessionStorage({
//     type:'SET_ITEM',
//     payload:{
//       item:'currentPath',
//       value:location.pathname
//     }
//   })

// dispathcSessionStorage({
//   type:"GET_ITEM",
//   payload:{
//     item:'currentPath',
//   }
// })

// }
// ,[location.pathname])




  // if (isRenderIntro) history.push('/wizard/novice/0/intro')
    // return (
      // <WizardIntro />
      // history.push('/wizard/novice/0/intro')
    // );
  // else {
  //   if (isRenderMemo){
  //     // return (
  //       history.push('/wizard/novice/0/memo')
  //       // <Route path={`/wizard/best`} render={() => <MemorizeSession />} />
  //       // <MemorizeSession />
  //     // );
  //   }
  //   else {
  //     if (isRenderOverlay) {
  //       history.push('/wizard/novice/0/overlay')
  //       // return (
  //       //   <Overlay />
  //       // );
  //     } else {
  //       if (isRenderRemem) {
  //         history.push('/wizard/novice/0/remem')
  //         // return (
  //         //   <RememberSession />
  //         // );
  //       }
  //       history.push('/wizard/novice/0/conclusion')
  //       // return (
  //       //   <Conclusion />
  //       // );
  //     }
  //   }
  // } 
  return (
    <React.Fragment>
    <Route path={`/wizard/${phase.route}/${currentLevel}/intro`} render={() => <WizardIntro />} />
    <Route path={`/wizard/${phase.route}/${currentLevel}/memo`} render={() => <MemorizeSession />} />
    <Route path={`/wizard/${phase.route}/${currentLevel}/overlay`} render={() => <Overlay />} />
    <Route path={`/wizard/${phase.route}/${currentLevel}/remem`} render={() => <RememberSession />} />
    <Route path={`/wizard/${phase.route}/${currentLevel}/conclusion`} render={() => <Conclusion />} />
    </React.Fragment>
  )
}
