import React from "react";
import {connect} from "react-redux";
import Moderator from "./Moderator";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";



let mapStateToProps = (state:AppStateType)=>{
    return {
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
    }
};

let ModeratorCompose = compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Moderator);
export default ModeratorCompose;
