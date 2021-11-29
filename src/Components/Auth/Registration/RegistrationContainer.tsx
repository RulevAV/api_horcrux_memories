import {connect} from "react-redux";
import {UserRegisterThunkCreator} from "../../../redux/Auth-Reducer";
import {compose} from "redux";
import {default as WichRegistration} from "./Registration";
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps = (state:AppStateType)=>{
    return {
        isRegister:state.authReducer.Register.isRegister,
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
        RegisterUser(FirstName:string,LastName:string,Username:string,Email:string,Password:string){
            dispatch(UserRegisterThunkCreator(FirstName,LastName,Username,Email,Password));
        }
    }
};
let Registration = compose(
    connect(mapStateToProps,mapDispatchToProps)
)(WichRegistration);
export default Registration;
