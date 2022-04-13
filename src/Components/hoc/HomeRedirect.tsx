import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
//<WCP> (WrappedComponent
let mapStateToPropsForRedirect = (state:any) => {
    return {
    }
}

type  BaseProps ={
    isAuthenticated:boolean
}
type DispathPropsType = {}
export function WithHomeRedirect<WCP> (WrappedComponent:React.ComponentType<WCP>){

    const RedirectComponent:React.FC<BaseProps> = (props)=>{
        let {isAuthenticated,...restProps} = props;
        if(isAuthenticated) return <Redirect to={"/"}/>
        return <WrappedComponent {...restProps as WCP}/>
    }
    let ConnectedAuthRedirectComponent = connect<any>(mapStateToPropsForRedirect)
    (RedirectComponent);

    return ConnectedAuthRedirectComponent;
}