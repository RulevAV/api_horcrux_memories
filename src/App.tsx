import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import ConnectLoginContainer from "./Components/Auth/Login/LoginContainer";
import NavContainer from "./Components/Navbar/NavContainer";
import RegistrationCompose from "./Components/Auth/Registration/RegistrationContainer";
import AdminCompose from "./Components/Admin/AdminContainer";
import HomeCompose from "./Components/Home/HomeContainer";
import WithTestContainer from "./Components/Test/TestContainer";


function App() {

  return (
    <div className="App">
        <NavContainer/>
        <div className="container">
            <div className={'app-wrapper-content'}>
                <Route render={()=><ConnectLoginContainer/>} path="/login"/>
                <Route render={()=><RegistrationCompose/>} path="/registration"/>
                <Route render={()=><AdminCompose/>} exact path="/Admin"/>
                <Route render={()=><HomeCompose pageTitle={"Hi"}/>} exact path="/"/>
                <Route render={()=><WithTestContainer/>} exact path="/Test/:nameTest"/>
            </div>
        </div>


    </div>
  );
}

export default App;
