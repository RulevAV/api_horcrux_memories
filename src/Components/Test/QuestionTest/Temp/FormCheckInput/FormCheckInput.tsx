import React from "react";

let FormCheckInput:React.FC<any> = (props)=>{

    return  <div className="form-check form-switch">

        <input className="form-check-input" type="checkbox" id="isIgnoreTest" checked={props.isIgnoreTest} onChange={()=>{
            props.setIsIgnoreTest(!props.isIgnoreTest)
        }}/>
        <label className="form-check-label" htmlFor="isIgnoreTest">Пропускать этот вопрос</label>
    </div>
}

export default FormCheckInput;