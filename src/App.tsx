import React, {useEffect} from 'react';
import './App.css';
import {Route} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import ConnectLoginContainer from "./Components/Login/LoginContainer";
import NavContainer from "./Components/Navbar/NavContainer";
import RegistrationCompose from "./Components/Registration/RegistrationContainer";
import AdminCompose from "./Components/Admin/AdminContainer";
import HomeCompose from "./Components/Home/HomeContainer";
import WithTestContainer from "./Components/Test/TestContainer";


function App() {

  return (
    <div className="App">
        <NavContainer/>
        <div className="container">
            <div className={'app-wrapper-content'}>
                {/*       <Route render={()=><DialogsConainer/>} path="/dialogs"/>
            <Route render={()=><ProfileContainer/>} path="/profile/:userId?"/>
            <Route render={()=><UsersContainer/>} path="/users"/>*/}
                <Route render={()=><ConnectLoginContainer/>} path="/login"/>
                <Route render={()=><RegistrationCompose/>} path="/registration"/>
                <Route render={()=><AdminCompose/>} exact path="/Admin"/>
                <Route render={()=><HomeCompose/>} exact path="/"/>
                <Route render={()=><WithTestContainer/>} exact path="/Test/:nameTest"/>
            </div>
        </div>

    </div>
  );
}

export default App;
