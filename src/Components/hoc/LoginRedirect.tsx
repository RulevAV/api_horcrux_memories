import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


export const LoginRedirect = (Component:any)=>{

    let RedirectComponent = (props:any)=>{
        if(!props.isAuthenticated) return <Redirect to={"/login"}/>
        return <Component {...props}/>
    }
    let mapStateToPropsForRedirect = (state:AppStateType) => {
        return {
            isAuthenticated : state.authReducer.Auth.isAuthenticated,
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}