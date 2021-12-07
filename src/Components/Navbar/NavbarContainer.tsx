import {useDispatch, useSelector} from "react-redux";
import {
     AuthActionsThunkCreator,
} from "../../redux/Auth-Reducer";
import Navbar from "./Navbar";
import {AppStateType} from "../../redux/redux-store";



const NavbarContainer = ()=>{
    const state = useSelector((state:AppStateType)=>{
        return {
            isAuthenticated:state.authReducer.Auth.isAuthenticated,
            roles : state.authReducer.Auth.roles
        }
    });
    const dispatch = useDispatch();

    const Logout = ()=>{
        dispatch(AuthActionsThunkCreator.Logout());
    };


    return <Navbar state={state} Logout={Logout} />
}

export default NavbarContainer;