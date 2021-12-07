import {connect} from "react-redux";
import {default as WichLogin} from "./Login";
import {AuthActions, AuthActionsThunkCreator} from "../../../redux/Auth-Reducer";
import {compose} from "redux";
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps = (state:AppStateType)=>{
    return {
    }
};

let Login = compose(
    connect(mapStateToProps, {
        SetUser:AuthActionsThunkCreator.SetUser,
        RegisterUser:AuthActions.UserRegister
    })
)(WichLogin);
export default Login;
