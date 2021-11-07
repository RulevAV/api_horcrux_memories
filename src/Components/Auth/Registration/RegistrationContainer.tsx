import {connect} from "react-redux";
import {UserRegisterThunkCreator} from "../../../redux/Auth-Reducer";
import {compose} from "redux";
import Registration from "./Registration";
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
let RegistrationCompose = compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Registration);
export default RegistrationCompose;
