import {connect} from "react-redux";
import Login from "./Login";
import {SetUserThunkCreator, AuthActions} from "../../../redux/Auth-Reducer";
import {compose} from "redux";
import {HomeRedirectRedirect} from "../../hoc/HomeRedirect";
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

let Pcompose = compose(
    HomeRedirectRedirect,
    connect(mapStateToProps,mapDispatchToProps)
)(Login);
export default Pcompose;
