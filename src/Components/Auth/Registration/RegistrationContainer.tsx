import {connect} from "react-redux";

import {compose} from "redux";
import {default as WichRegistration} from "./Registration";
import {AppStateType} from "../../../redux/redux-store";
import {AuthActionsThunkCreator} from "../../../redux/Auth-Reducer";

let mapStateToProps = (state:AppStateType)=>{
    return {
        isRegister:state.authReducer.Register.isRegister,
    }
};

let Registration = compose(
    connect(mapStateToProps, {
        RegisterUser:AuthActionsThunkCreator.UserRegister
    })
)(WichRegistration);
export default Registration;
