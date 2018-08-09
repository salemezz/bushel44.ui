import React from 'react'
import { Route, Redirect } from 'react-router'
import { checkIfAuthenticated, checkIfAuthorized } from '../../libraries/authentication'

export default ({ component: Component, ...rest }) => (
   <Route {...rest} render={props=>{
       if((checkIfAuthenticated())){
           if(props.permission){
               return checkIfAuthorized(props.permission) ? (
                   <Component {...props}/>
                   ) : (
                   <Redirect to={{
                       pathname: "/login",
                       state: { from: props.location }
                   }}/>
               )
           }
           else{
               return <Component {...props} />
           }
       }
       else{
           return (
               <Redirect to={{
                   pathname: "/login",
                   state: { from: props.location }
               }}/>
           )
       }
   }}
   />
)