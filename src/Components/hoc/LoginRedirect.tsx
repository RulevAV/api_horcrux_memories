import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type  BaseProps ={
    isAuthenticated:boolean
}
let mapStateToPropsForRedirect = (state:AppStateType) => {
    return {
        isAuthenticated : state.authReducer.Auth.isAuthenticated,
    }
}

export function LoginRedirect<WCP>  (Component:React.ComponentType<WCP>){

    let RedirectComponent:React.FC<BaseProps> = (props)=>{
        let {isAuthenticated,...restProps} = props;

        if(!isAuthenticated) return <Redirect to={"/login"}/>
        return <Component {...restProps as WCP  }/>
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}