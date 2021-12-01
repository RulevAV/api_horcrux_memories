import React, {useEffect,useState} from 'react';
import './App.css';
import {Route} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ConnectLoginContainer from "./Components/Auth/Login/LoginContainer";
import RegistrationCompose from "./Components/Auth/Registration/RegistrationContainer";
import HomeCompose from "./Components/Home/HomeContainer";
import WithTestContainer from "./Components/Test/TestContainer";
import {WithHomeRedirect} from "./Components/hoc/HomeRedirect";
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import AdminCompose from "./Components/Admin/AdminContainer";
import {WithInitialApp} from "./Components/hoc/InitialApp";
import {useDispatch, useSelector} from "react-redux";
import {AuthActions} from "./redux/Auth-Reducer";
import {LockScreen} from "./Components/LockScreen/LockScreen";
import {AppStateType} from "./redux/redux-store";
let Login = WithHomeRedirect(ConnectLoginContainer);

let Content = ()=>{
    return  <div className="container">
        <div className={'app-wrapper-content'}>
            <Route render={()=><Login title={"Вход в аккаунт"} />} path="/login"/>
            <Route render={()=><RegistrationCompose/>} path="/registration"/>
            <Route render={()=><AdminCompose/>} exact path="/Admin"/>
            <Route render={()=><HomeCompose pageTitle={"Hi"}/>} exact path="/"/>
            <Route render={()=><WithTestContainer/>} exact path="/Test/:nameTest"/>
        </div>
    </div>
};
let InitialApp = WithInitialApp(Content);


const App : React.FC= () => {

    let IsLockScreen = useSelector((state:AppStateType)=>{
        return {
            IsLockScreen : state.authReducer.IsLockScreen
        }
    })
    let dispath = useDispatch();

    useEffect(()=>{
        dispath(AuthActions.InitialApp())
    },[])
  return (
    <div >
        {IsLockScreen.IsLockScreen?<LockScreen/>
            :null
        }

        <NavbarContainer/>
        <InitialApp/>
    </div>
  );
}

export default App;
