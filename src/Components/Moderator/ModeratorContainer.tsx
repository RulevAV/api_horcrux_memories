import React from "react";
import {connect} from "react-redux";
import Moderator from "./Moderator";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";



let mapStateToProps = (state:AppStateType)=>{
    return {
    }
};

let ModeratorCompose = compose(
    connect(mapStateToProps, {})
)(Moderator);
export default ModeratorCompose;
