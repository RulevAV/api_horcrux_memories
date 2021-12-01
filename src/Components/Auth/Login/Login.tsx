import React from 'react'
import {NavLink} from "react-router-dom";
import {outValid, useInput} from "../UseValidator";
import user from '../../../img/among_us_player_light_green_icon_156936.png';
type PropsType = {
    SetUser:(Email:string,Password:string)=>void,
    RegisterUser:()=>void,
    title:string
}

const Login:React.FC<PropsType> = ({SetUser, RegisterUser,title}) =>{

    const login = useInput("maag@mail.ru",{minLength:3,maxLength:40,isEmpty:true});
    const password = useInput("Pa$$w0rd.",{minLength:6,isEmpty:true});
    const onClick = ()=>{
        SetUser(login.value,password.value);
    }

    return <div className={"text-white container d-flex align-items-center justify-content-center"}>
        <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
            <div className="div-box" >
                <div className={"d-flex align-items-center justify-content-center"}>
                    <img src={user} style={{height:100,width:100}} alt="icon_User"/>
                </div>
                <div className={"d-flex align-items-center justify-content-center"}>
                    <h1>{title}</h1>
                </div>

                <div className="mb-3">
                    <label htmlFor="Login" className="form-label" >Логин</label>
                    <input id="Login" placeholder="Введите логин" onChange={login.onChange} value={login.value} onBlur={login.onBlur} className="form-control" name="UserName"/>
                    {outValid(login)}
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label" >Пароль</label>
                    <input id="Password" onChange={password.onChange} value={password.value} onBlur={password.onBlur}  className="form-control" name="Password"/>
                    {outValid(password)}
                </div>
                <div className="mb-3">
                    <label htmlFor="RememberMe" className="form-label" >Запоинить меня?</label>
                    <input id="RememberMe" type="checkbox" className="form-check-input" />
                </div>
                <div className="mb-3">
                    <NavLink id={"Registration"} className="link-success p-3" onClick={RegisterUser}  to={"/registration"}>Зарегаться</NavLink>
                    <a className="link-success" href={"https://maagserver/HorcruxMemories/Account/ForgotPassword"}>Забыли пароль?</a>
                </div>

                <div className="row">
                    <button id={"Exit"} onClick={onClick} disabled={!login.inputValid ||!password.inputValid} type="submit" className="btn btn-primary">Войти</button>
                </div>
            </div>
        </div>
    </div>
}




export default Login;