import React from 'react'
import { Route,Redirect } from 'react-router-dom'
import { useDataContext } from '../context/Context'

export default function PrivateRoute({component:Component,...rest}){
    const {phase,isOnline}=useDataContext()
    return(
        <Route
            {...rest}
            render={props=>{
                return phase&&isOnline? <Component {...props} /> :<Redirect to='/' />
            }}
        ></Route>
    )
}