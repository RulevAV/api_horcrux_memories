import {useDispatch, useSelector} from "react-redux";
import {LogoutThunkCreator, RefreshAuthCookieThunkCreator} from "../../redux/Auth-Reducer";
import Navbar from "./Navbar";


export type TypeProps= {
    data:{
        isAuthenticated:boolean,
        roles : Array<string>
    },
    Logout:()=>void,
    RefreshAuthCookie:()=>void
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
    const RefreshAuthCookie = ()=>{
        dispatch(RefreshAuthCookieThunkCreator());
    };

    return <Navbar data={data} Logout={Logout} RefreshAuthCookie={RefreshAuthCookie}/>
}

export default NavbarContainer;