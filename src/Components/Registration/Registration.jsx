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
                    break;
                default : break;
            }
        }
    },[value])
    useEffect(()=>{
        if (isEmpty ||minLengthError||maxLengthError||isEmail) {
            setInputValid(false);
        }
                    else {
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

let outValid = (input) =>
{
    return <>
        {(input.isDirty && input.isEmpty ) && <div style={{color:"red"}}>{input.isEmpty}</div>}
        {(input.isDirty && input.minLengthError) && <div style={{color:"red"}}>{input.minLengthError}</div>}
        {(input.isDirty && input.maxLengthError) && <div style={{color:"red"}}>{input.maxLengthError}</div>}
        {(input.isDirty && input.isEmail) && <div style={{color:"red"}}>Не является почтой</div>}
    </>
}

const Registration = (props) =>{

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




    return <div align="center">
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
