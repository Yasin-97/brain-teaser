import React, { useEffect } from "react";
import {Route,useHistory,useLocation} from "react-router-dom";
import { useDataContext } from "../context/Context";
//components
import PrivateRoute from '../components/PrivateRoute'
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
  sessionStorageState,
  phase,
  words,
  currentLevel,
}=useDataContext()

//effects
//set then get the current path to redirect to the same component, in the case user update or refresh the page

// useEffect(()=>{
// sessionStorage.setItem('currentPath',JSON.stringify(location.pathname))
// history.replace(JSON.parse(sessionStorage.getItem('currentPath')))
// }
// ,[location.pathname])


// const lastLevel=JSON.parse(sessionStorage.getItem('last level'))


// useEffect(()=>{
//set current path to back to the same componet/page on page refresh
  // dispathcSessionStorage({ type:'SET_ITEM', payload:{ item:'currentPath', value:location.pathname }})

  // const path=dispathcSessionStorage({ type:"GET_ITEM", payload:{ item:'currentPath' }})
  
  //  history.replace(path)
// }
// ,[location.pathname])



  return (
    <React.Fragment>
     {/* <Route path={`/wizard/${phase.route}/${currentLevel}/intro`} render={() => <WizardIntro />} />
    <Route path={`/wizard/${phase.route}/${currentLevel}/memo`} render={() => <MemorizeSession />} />
    <Route path={`/wizard/${phase.route}/${currentLevel}/overlay`} render={() => <Overlay />} />
    <Route path={`/wizard/${phase.route}/${currentLevel}/remem`} render={() => <RememberSession />} />
    <Route path={`/wizard/${phase.route}/${currentLevel}/conclusion`} render={() => <Conclusion />} />  */}
     <PrivateRoute path={`/wizard/${phase.route}/${currentLevel}/intro`} component={WizardIntro} />
     <PrivateRoute path={`/wizard/${phase.route}/${currentLevel}/memo`} component={MemorizeSession} />
     <PrivateRoute path={`/wizard/${phase.route}/${currentLevel}/overlay`} component={Overlay} />
     <PrivateRoute path={`/wizard/${phase.route}/${currentLevel}/remem`} component={RememberSession} />
     <PrivateRoute path={`/wizard/${phase.route}/${currentLevel}/conclusion`} component={Conclusion} />
    
    </React.Fragment>
  )
}
