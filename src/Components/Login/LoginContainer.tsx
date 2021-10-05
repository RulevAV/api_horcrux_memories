import React from "react";
import {connect} from "react-redux";
import Login from "./Login";
import {SetUserThunkCreator} from "../../redux/Auth-Reducer";
import {WithHomeRedirect} from "../hoc/HomeRedirect";
import {compose} from "redux";


let mapStateToProps = (state:any)=>{
    return {
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
        SetUser(Email:string,Password:string){
            //console.log(Email,Password)
            dispatch(SetUserThunkCreator(Email,Password));
        }
    }
};

let Pcompose = compose(
    WithHomeRedirect,
    connect(mapStateToProps,mapDispatchToProps)
)(Login);
export default Pcompose;
