import {connect} from "react-redux";
import Admin from "./Admin";
import {compose} from "redux";
import {NoAuthRedirect} from "../hoc/NoAuthRedirect";
import {GetUsersThunkCreator, SetUserRolesThunkCreator} from "../../redux/Auth-Reducer";


let mapStateToProps = (state:any)=>{
    return {
        Users : state.authReducer.Admin.Users,
        AllRoles : state.authReducer.Admin.AllRoles,
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
        GetUsers (){
            dispatch(GetUsersThunkCreator());
        },
        SetUserRoles(Email:string,Roles:Array<string>){

            dispatch(SetUserRolesThunkCreator(Email,Roles));
        }

    }
};

let AdminCompose = compose(
    NoAuthRedirect,
    connect(mapStateToProps,mapDispatchToProps)
)(Admin);
export default AdminCompose;
