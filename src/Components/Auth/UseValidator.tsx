import React, {useEffect, useState} from "react";

export type  validationsType = {
    minLength?:number,
    maxLength?:number,
    isEmpty?:boolean,
    isEmail?:boolean,
}

type inputType = {
    isEmpty:string,
    minLengthError:string,
    maxLengthError:string,
    isEmail:boolean,
    inputValid:boolean,
    isDirty:boolean
}

export const useInput = (initialValue:string,validations:validationsType) =>{
    const [value,setValue] = useState(initialValue);
    const [isDirty,setIsDirty] = useState(false);
    const valid = useValidation(value,validations);

    const onChange = (e:any) =>{
        setValue(e.target.value);
    }
    const onBlur = (e:any) =>{
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

export let outValid = (input:inputType) =>
{
    return <>
        {(input.isDirty && input.isEmpty ) && <div style={{color:"red"}}>{input.isEmpty}</div>}
        {(input.isDirty && input.minLengthError) && <div style={{color:"red"}}>{input.minLengthError}</div>}
        {(input.isDirty && input.maxLengthError) && <div style={{color:"red"}}>{input.maxLengthError}</div>}
        {(input.isDirty && input.isEmail) && <div style={{color:"red"}}>Не является почтой</div>}
    </>
}


const useValidation = (value:string,validations:validationsType)=>{

    const [isEmpty,setIsEmpty] = useState<string>("");
    const [minLengthError,setMinLengthError] = useState<string>("");
    const [maxLengthError,setMaxLengthError] = useState<string>("");
    const [isEmail,setisEmail] = useState<boolean>(false);
    const [inputValid,setInputValid]= useState<boolean>(false);
    useEffect(()=>{
        for(const validation in validations)
        {
            switch (validation){
                case "minLength":
                    /* console.log(value.length,"<",validations[validation])*/
                    let minLength = validations[validation];
                    !!minLength && value.length < minLength
                        ? setMinLengthError(`Поле не должно быть меньше ${validations[validation]} символов`)
                        : setMinLengthError("");
                    break;
                case "maxLength":
                    /* console.log(value.length,"<",validations[validation])*/
                    let maxLength = validations[validation];
                    !!maxLength && value.length > maxLength
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
                default: break;
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
export default useValidation;