import {connect} from "react-redux";
import Navbar from "./Navbar";
import { authCookieThunkCreator, LogoutThunkCreator} from "../../redux/Auth-Reducer";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state:AppStateType) => {
    return {
        isAuthenticated : state.authReducer.Auth.isAuthenticated,
        roles:state.authReducer.Auth.roles,
    }
}
let mapDispatchToProps = (dispatch:any)=>{
    return{
        Logout(){
            dispatch(LogoutThunkCreator());
        },
        authCookie(){
            dispatch(authCookieThunkCreator());
        },


    }
};

let NavContainer = connect(mapStateToProps,mapDispatchToProps)(Navbar);

export default NavContainer;