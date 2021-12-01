import {useDispatch, useSelector} from "react-redux";
import {
    AuthActions, AuthType,
    LogoutThunkCreator,
} from "../../redux/Auth-Reducer";
import Navbar from "./Navbar";


export type TypeProps= {
    data:{
        isAuthenticated:boolean,
        roles : Array<string>
    },
    Logout:()=>void,
    InitialApp:()=>void,
}

const NavbarContainer = ()=>{
    const data = useSelector((state:any)=>{
        return {
            isAuthenticated:state.authReducer.Auth.isAuthenticated,
            roles : state.authReducer.Auth.roles
        }
    });
    const dispatch = useDispatch();
    const Logout = ()=>{
        dispatch(LogoutThunkCreator());
    };
    const InitialApp = ()=>{
        dispatch(AuthActions.InitialApp());
    };

    return <Navbar data={data} Logout={Logout} InitialApp={InitialApp}/>
}

export default NavbarContainer;