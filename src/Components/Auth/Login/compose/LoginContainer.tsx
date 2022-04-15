import { useDispatch, useSelector} from "react-redux";
import Login from "./Login";
import {AppStateType} from "../../../../redux/redux-store";
import { AuthActionsThunk } from "../../../../redux/Auth/Auth-Reducer";
import { useHistory } from "react-router-dom";

export const LoginContainer = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();

    const setLogin = (login:string,password:string)=>{
        dispatch(AuthActionsThunk.login(login,password));
    }
    
    const isAuthenticated = useSelector((state:AppStateType)=>{
        return state.authReducer.isAuthenticated;
    });
    
    if(isAuthenticated)
        history.push("/");

    return <Login setLogin={setLogin} />
}