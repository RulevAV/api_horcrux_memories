import {useDispatch, useSelector} from "react-redux";
import Navbar from "./Navbar";
import {AppStateType} from "../../redux/redux-store";
import { AuthActionsThunk } from "../../redux/Auth/Auth-Reducer";
import { Redirect } from "react-router-dom";

const NavbarContainer = ()=>{
    const dispatch = useDispatch();

    const state = useSelector((state:AppStateType)=>{
        return {
            isAuthenticated:state.authReducer.isAuthenticated,
            roles :state.authReducer.roles,
            userName: state.authReducer.userName
        }
    });
   
    const Logout = async()=>{
        dispatch(AuthActionsThunk.Logout());
    };
    
    if (!state.isAuthenticated) {
        return <Redirect to="/login"/>
    }

    
    return <Navbar state={state} Logout={Logout} />
}

export default NavbarContainer;