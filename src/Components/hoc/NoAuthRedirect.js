import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";


export const NoAuthRedirect = (Component) =>{
    class RedirectComponent extends React.Component {
        render() {
             if(!this.props.isAuthenticated) return <Redirect to={"/"}/>
                return <Component {...this.props}/>
        }
    }
    let mapStateToPropsForRedirect = (state) => {
        return {
            isAuthenticated : state.authReducer.Auth.isAuthenticated,
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}

