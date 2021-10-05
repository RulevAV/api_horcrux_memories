import React, {useEffect, useState} from 'react'

const useValidation = (value,validations)=>{

    const [isEmpty,setIsEmpty] = useState("");
    const [minLengthError,setMinLengthError] = useState(false);
    const [maxLengthError,setMaxLengthError] = useState(false);
    const [isEmail,setisEmail] = useState(false);
    const [inputValid,setInputValid]= useState(false);
    useEffect(()=>{
        for(const validation in validations)
        {
            switch (validation){
                case "minLength":
                   /* console.log(value.length,"<",validations[validation])*/
                    value.length < validations[validation]
                        ? setMinLengthError(`Поле не должно быть меньше ${validations[validation]} символов`)
                        : setMinLengthError("");
                    break;
                case "maxLength":
                    /* console.log(value.length,"<",validations[validation])*/
                    value.length > validations[validation]
                        ? setMaxLengthError(`Поле не должно быть больше ${validations[validation]} символов`)
                        : setMaxLengthError("");
                    break;
                case "isEmpty":
                    value ? setIsEmpty("") : setIsEmpty("Поле не должно быть пустым");
                    break;
                case "isEmail":
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    setisEmail(!re.test(String(value).toLowerCase()));
            }
        }
    },[value])
    useEffect(()=>{
        if (isEmpty ||minLengthError||maxLengthError||isEmail) {
            console.log(false);
            setInputValid(false);
        }
                    else {
            console.log(true);
            setInputValid(true);
        }
    },[isEmpty,minLengthError,maxLengthError,isEmail]);
    return{
        isEmpty,
        minLengthError,
        maxLengthError,
        isEmail,
        inputValid
    }
}

const useInput = (initialValue,validations) =>{
    const [value,setValue] = useState(initialValue);
    const [isDirty,setIsDirty] = useState(false);
    const valid = useValidation(value,validations);

    const onChange = (e) =>{
        setValue(e.target.value);
    }
    const onBlur = (e) =>{
        setIsDirty(true);
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

const Registration = (props) =>{

    const login = useInput("user@secureapi.com",{minLength:3,maxLength:40,isEmpty:true});
    const password = useInput("Pa$$w0rd.",{minLength:6,isEmpty:true});
    const onClick = ()=>{
        props.SetUser(login.value,password.value);
    }




    return <div align="center">
        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-2">
            <div className="div-box" >
                <h1>Регистрация</h1>

                <div className="mb-3">
                    <label className="form-label" >Логин</label>
                    <input onChange={login.onChange} value={login.value} onBlur={login.onBlur} className="form-control" name="UserName"/>
                    {(login.isDirty && login.isEmpty ) && <div style={{color:"red"}}>{login.isEmpty}</div>}
                    {(login.isDirty && login.minLengthError) && <div style={{color:"red"}}>{login.minLengthError}</div>}
                    {(login.isDirty && login.maxLengthError) && <div style={{color:"red"}}>{login.maxLengthError}</div>}
                    {(login.isDirty && login.isEmail) && <div style={{color:"red"}}>Не является почтой</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" >Пароль</label>
                    <input onChange={password.onChange} value={password.value} onBlur={password.onBlur}  className="form-control" name="Password"/>
                    {(password.isDirty && password.isEmpty ) && <div style={{color:"red"}}>{password.isEmpty}</div>}
                    {(password.isDirty && password.minLengthError ) && <div style={{color:"red"}}>{password.minLengthError}</div>}   </div>
                <div className="mb-3">
                    <label className="form-label" asp-for="RememberMe">Запоинить меня?</label>
                    <input className="form-check-input" asp-for="RememberMe"/>
                    <span asp-validation-for="RememberMe"></span>
                </div>
                <div className="mb-3">
                    <a className="link-success"  href={"https://maagserver/HorcruxMemories/Account/Register"} asp-area="" asp-controller="Account"
                       asp-action="Register">Зарегаться</a>
                    <a className="link-success" href={"https://maagserver/HorcruxMemories/Account/ForgotPassword"}>Забыли
                        пароль?</a>

                </div>

                <div className="row">
                    <button onClick={onClick} disabled={!login.inputValid ||!password.inputValid} type="submit" className="btn btn-primary">Войти</button>
                </div>
            </div>
        </div>
    </div>
}




export default Registration;
