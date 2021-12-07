import React from 'react'
import {outValid, useInput} from "../UseValidator";
import user from "../../../img/2998137-clover-four-leaf_99856.svg";

type propsType = {
    isRegister:boolean,
    RegisterUser:(FirstName:string,LastName:string,Username:string,Email:string,Password:string)=>void,

}
const Registration = (props:propsType) =>{

    const Username = useInput("Ivan",{minLength:3,maxLength:40,isEmpty:true});
    const Password = useInput("Qwerty9.",{minLength:6,isEmpty:true});
    const Email = useInput("Ivan@mail.ru",{isEmpty:true,isEmail:true});
    const FirstName = useInput("Иван",{isEmpty:true});
    const LastName = useInput("Иван",{isEmpty:true});

    const onClick = ()=>{
        props.RegisterUser(
            FirstName.value,
            LastName.value,
            Username.value,
            Email.value,
            Password.value
            );
    }


    return <div className={"text-white container d-flex align-items-center justify-content-center"}>
        <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
            {!props.isRegister
                ?<div className="div-box" >
                    <div className={"d-flex align-items-center justify-content-center"}>
                        <img src={user} style={{height:100,width:100}} alt="icon_User"/>
                    </div>
                <h1>Регистрация</h1>
                <div className="mb-3">
                    <label className="form-label" >Логин</label>
                    <input onChange={Username.onChange} value={Username.value} onBlur={Username.onBlur} className="form-control" name="UserName"/>
                    {outValid(Username)}
                </div>

                <div className="mb-3">
                    <label className="form-label" >Пароль</label>
                    <input type={"password"} onChange={Password.onChange} value={Password.value} onBlur={Password.onBlur}  className="form-control" name="Password"/>
                    {outValid(Password)}
                </div>

                <div className="mb-3">
                    <label className="form-label" >Email</label>
                    <input onChange={Email.onChange} value={Email.value} onBlur={Email.onBlur}  className="form-control" name="Email"/>
                    {outValid(Email)}
                </div>
                <div className="mb-3">
                    <label className="form-label" >Имя</label>
                    <input onChange={FirstName.onChange} value={FirstName.value} onBlur={FirstName.onBlur}  className="form-control" name="FirstName"/>
                    {outValid(FirstName)}
                </div>
                <div className="mb-3">
                    <label className="form-label" >Фомилия</label>
                    <input onChange={LastName.onChange} value={LastName.value} onBlur={LastName.onBlur}  className="form-control" name="LastName"/>
                    {outValid(LastName)}
                </div>



                <div className="row">
                    <button id={"Register"}  onClick={onClick}
                            disabled={
                                !Username.inputValid
                                ||!Password.inputValid
                                ||!Email.inputValid
                                ||!FirstName.inputValid
                            }type="submit" className="btn btn-primary">Зарегаться</button>
                </div>
            </div>
                : <h1>Пользователь зарегистрирован</h1>
            }
        </div>
    </div>
}




export default Registration;
