import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";


export const LoginRedirect = (Component:any)=>{

    let RedirectComponent = (props:any)=>{
        if(!props.isAuthenticated) return <Redirect to={"/login"}/>
        return <Component {...props}/>
    }
    let mapStateToPropsForRedirect = (state:any) => {
        return {
            isAuthenticated : state.authReducer.Auth.isAuthenticated,
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}