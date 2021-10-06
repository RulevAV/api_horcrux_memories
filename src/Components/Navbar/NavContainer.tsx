import {connect} from "react-redux";
import Navbar from "./Navbar";
import { authCookieThunkCreator, LogoutThunkCreator} from "../../redux/Auth-Reducer";

let mapStateToProps = (state:any) => {
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