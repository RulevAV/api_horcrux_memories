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


function App() {

  return (
    <div className="App">
        <NavContainer/>
        <div className="container">
            {/*<button onClick={()=>AuthAPI.Register("Mukesh","Mukesh","Mukesh","Maag@mail.ru","Pa$$w0rd.")}>Register</button>
            <button onClick={()=>AuthAPI.Token("Maag@mail.ru","Pa$$w0rd.")}>login</button>
            <button onClick={()=>AuthAPI.AddRole("Maag@mail.ru","Pa$$w0rd.","Administrator")}>Addrole</button>
            <button onClick={()=>AuthAPI.RefreshToken()}>Refresh</button>
            <button onClick={()=>AuthAPI.RevokeToken("07qHcBHN3s%2FnyLt7qIw8x%2BVeroBsUAmKvvYexkPKBzg")}>RevokeToken</button>
            <button onClick={()=>AuthAPI.UserTokens("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNdWtlc2gxIiwianRpIjoiNzUzOTMwNDgtNzJlZC00MjA1LTgwYmItOTk4OTk5ZTFmN2FkIiwiZW1haWwiOiJNdWtlc2hAbWFpbC5ydSIsInVpZCI6IjQ3ZDg0NjFhLTU5YTktNGE2My1hOGMxLTJjMjFlZmZmNTEwMyIsInJvbGVzIjoiVXNlciIsImV4cCI6MTYzMjk1MTY2NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.5cipLO3TFHikfmaYagVePLj3e6V2NC59JZxzv3AIo90"
                ,"96f1617c-fd8e-4377-b242-fb0e2db133c0")}>UserTokens</button>
            <button onClick={()=>DataAPI.Secured()}>Secured</button>*/}

            <div className={'app-wrapper-content'}>
                {/*       <Route render={()=><DialogsConainer/>} path="/dialogs"/>
            <Route render={()=><ProfileContainer/>} path="/profile/:userId?"/>
            <Route render={()=><UsersContainer/>} path="/users"/>*/}
                <Route render={()=><ConnectLoginContainer/>} path="/login"/>
                <Route render={()=><RegistrationCompose/>} path="/registration"/>
                <Route render={()=><AdminCompose/>} exact path="/Admin"/>
                <Route render={()=><HomeCompose/>} exact path="/"/>


            </div>
        </div>

    </div>
  );
}

export default App;
