import React, {useEffect, useState} from "react";

let FormCheckInput:React.FC<any> = (props)=>{
    let [isIgnoreTest,setIsIgnoreTest] = useState(props.isIgnoreTest);
    useEffect(()=>{
        setIsIgnoreTest(props.isIgnoreTest);
    },[props])
    return  <div className="form-check form-switch">

        <input className="form-check-input" type="checkbox" id="isIgnoreTest" checked={isIgnoreTest} onChange={()=>{
            setIsIgnoreTest(!isIgnoreTest)
        }}/>
        <label className="form-check-label" htmlFor="isIgnoreTest">Пропускать этот вопрос</label>
    </div>
}

export default FormCheckInput;