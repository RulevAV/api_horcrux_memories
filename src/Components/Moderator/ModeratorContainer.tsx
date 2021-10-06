import React from "react";
import {connect} from "react-redux";
import Moderator from "./Moderator";
import {compose} from "redux";
import {NoAuthRedirect} from "../hoc/NoAuthRedirect";


let mapStateToProps = (state:any)=>{
    return {
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
    }
};

let ModeratorCompose = compose(
    NoAuthRedirect,
    connect(mapStateToProps,mapDispatchToProps)
)(Moderator);
export default ModeratorCompose;
