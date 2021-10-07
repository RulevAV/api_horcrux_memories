import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import TestReducer from "../../redux/Test-Reducer";


export const TestRedirect = (Component) =>{
    class RedirectComponent extends React.Component {
        render() {
             if(!this.props.IdRoot) return <Redirect to={"/"}/>
                return <Component {...this.props}/>
        }
    }
    let mapStateToPropsForRedirect = (state) => {
        return {
            IdRoot : state.TestReducer.IdRoot
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}

