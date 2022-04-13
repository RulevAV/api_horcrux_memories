import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
//<WCP> (WrappedComponent
let mapStateToPropsForRedirect = (state:any) => {
    return {
    }
}

type  BaseProps ={
    InitialApp:boolean
}
type DispathPropsType = {}
export function WithInitialApp<WCP> (WrappedComponent:React.ComponentType<WCP>){

    const RedirectComponent:React.FC<BaseProps> = (props)=>{
        let {InitialApp,...restProps} = props;
        if(!InitialApp) return <div>Инициализация...</div>
        return <WrappedComponent {...restProps as WCP}/>
    }

    let ConnectedAuthRedirectComponent = connect<any>(mapStateToPropsForRedirect)
    (RedirectComponent);

    return ConnectedAuthRedirectComponent;
}