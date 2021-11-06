import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";


export const WithAuthRedirect = (Component:any)=>{

    let RedirectComponent = (props:any)=>{
        type RootReduserType = typeof Component;
        //console.log(asd.);
        if(!props.isAuthenticated) return <Redirect to={"/login"}/>
        return <Component {...props}/>
    }
    let mapStateToPropsForRedirect = (state:any) => {
        return {
            isAuth : state.authReducer.Auth.isAuthenticated,
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}