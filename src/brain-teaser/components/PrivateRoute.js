import React from 'react'
import { Route,Redirect } from 'react-router-dom'
import { useDataContext } from '../context/Context'

export default function PrivateRoute({component:Component,...rest}){
    const {phase,isOnline}=useDataContext()
const test=false
console.log(phase);
    return(
        <Route
            {...rest}
            render={props=>{
                return phase&&isOnline? <Component {...props} /> :<Redirect to='/' />
            }}
        ></Route>
    )
}