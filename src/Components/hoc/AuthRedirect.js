import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";


export const WithAuthRedirect = (Component) =>{
    class RedirectComponent extends React.Component {
        render() {
             if(!this.props.isAuthenticated) return <Redirect to={"/login"}/>
                return <Component {...this.props}/>
        }
    }
    let mapStateToPropsForRedirect = (state) => {
        return {
            isAuth : state.authReducer.isAuthenticated,
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}

