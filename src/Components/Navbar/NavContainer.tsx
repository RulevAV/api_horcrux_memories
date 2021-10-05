import React from 'react'
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {LogoutThunkCreator} from "../../redux/Auth-Reducer";

let mapStateToProps = (state:any) => {
    return {
        isAuthenticated : state.authReducer.isAuthenticated,
    }
}
let mapDispatchToProps = (dispatch:any)=>{
    return{
        Logout(){
            dispatch(LogoutThunkCreator());
        }

    }
};

let NavContainer = connect(mapStateToProps,mapDispatchToProps)(Navbar);

export default NavContainer;