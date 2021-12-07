import {connect} from "react-redux";
import {compose} from "redux";
import {AdminActions, AdminActionsThunkCreator} from "../../redux/Admin-Reducer";
import Admin from "./Admin";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state:AppStateType)=>{
    return {
        users : state.AdminReducer.users,
        allRoles : state.AdminReducer.allRoles,
    }
};

let AdminCompose = compose(
    connect(mapStateToProps, {
        GetUsers: AdminActionsThunkCreator.GetUsers,
        SetUserRoles: AdminActionsThunkCreator.SetUserRoles,
        ClearState: AdminActions.ClearState,
    })
)(Admin);
export default AdminCompose;
