import React from "react";
import {connect} from "react-redux";
import {SetUserThunkCreator} from "../../redux/Auth-Reducer";
import {WithHomeRedirect} from "../hoc/HomeRedirect";
import {compose} from "redux";
import Registration from "./Registration";


let mapStateToProps = (state:any)=>{
    return {
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
        SetUser(Email:string,Password:string){
            dispatch(SetUserThunkCreator(Email,Password));
        }
    }
};
let RegistrationCompose = compose(
    WithHomeRedirect,
    connect(mapStateToProps,mapDispatchToProps)
)(Registration);
export default RegistrationCompose;
