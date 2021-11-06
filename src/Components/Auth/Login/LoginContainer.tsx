import {connect} from "react-redux";
import Login from "./Login";
import {SetUserThunkCreator, UserRegister} from "../../../redux/Auth-Reducer";
import {compose} from "redux";


let mapStateToProps = (state:any)=>{
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
            dispatch(UserRegister(false,""));
        }
    }
};

let Pcompose = compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Login);
export default Pcompose;