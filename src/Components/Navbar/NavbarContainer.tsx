import {useDispatch, useSelector} from "react-redux";
import Navbar from "./Navbar";
import {AppStateType} from "../../redux/redux-store";
import { AuthActionsThunk } from "../../redux/User/Auth-Reducer";

const NavbarContainer = ()=>{
    const dispatch = useDispatch();

    const state = useSelector((state:AppStateType)=>{
        return {
            isAuthenticated:state.authReducer.isAuthenticated,
            roles :state.authReducer.roles
        }
    });
   
    const Logout = ()=>{
        dispatch(AuthActionsThunk.Logout());
    };

    return <Navbar state={state} Logout={Logout} />
}

export default NavbarContainer;