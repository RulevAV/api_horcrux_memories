import {connect} from "react-redux";
import {default as WichLogin} from "./Login";
import {SetUserThunkCreator, AuthActions} from "../../../redux/Auth-Reducer";
import {compose} from "redux";
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps = (state:AppStateType)=>{
    return {
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
        SetUser(Email:string,Password:string){
            //console.log(Email,Password)
            dispatch(SetUserThunkCreator(Email,Password));
        },
        RegisterUser(){
            dispatch(AuthActions.UserRegister(false,""));
        }
    }
};

let Login = compose(
    connect(mapStateToProps,mapDispatchToProps)
)(WichLogin);
export default Login;
