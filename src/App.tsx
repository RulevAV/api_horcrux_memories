import React from 'react';
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


  return (
    <div >
        <NavbarContainer/>
        <InitialApp/>
    </div>
  );
}

export default App;
