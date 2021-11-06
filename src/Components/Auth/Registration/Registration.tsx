import React from 'react'
import {outValid, useInput} from "../UseValidator";

const Registration = (props:any) =>{

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


    return <div >
        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-2">
            {!props.isRegister
                ?<div className="div-box" >
                <h1>Регистрация</h1>
                <div className="mb-3">
                    <label className="form-label" >Логин</label>
                    <input onChange={Username.onChange} value={Username.value} onBlur={Username.onBlur} className="form-control" name="UserName"/>
                    {outValid(Username)}
                </div>

                <div className="mb-3">
                    <label className="form-label" >Пароль</label>
                    <input onChange={Password.onChange} value={Password.value} onBlur={Password.onBlur}  className="form-control" name="Password"/>
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
                    <button onClick={onClick}
                            disabled={
                                !Username.inputValid
                                ||!Password.inputValid
                                ||!Email.inputValid
                                ||!FirstName.inputValid
                            }type="submit" className="btn btn-primary">Войти</button>
                </div>
            </div>
                : <h1>Пользователь зарешистрирован</h1>
            }
        </div>
    </div>
}




export default Registration;
