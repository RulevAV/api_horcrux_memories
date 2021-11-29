import {useDispatch, useSelector} from "react-redux";
import {LogoutThunkCreator, RefreshAuthCookieThunkCreator} from "../../redux/Auth-Reducer";
import Navbar from "./Navbar";


export type TypeProps= {
    data:{
        isAuthenticated:boolean,
        roles : Array<string>
    },
    Logout:()=>void,
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


    return <Navbar data={data} Logout={Logout}/>
}

export default NavbarContainer;