import img from "../../../img/2T5qG95FFcs.jpg";
import {NavLink} from "react-router-dom";
import React, {useState} from "react";

type PropsType = {
    isIgnoreTest:string,
    isHiddenContentTest:string,
    images:string,
    name:string,
    id:string,
    QuestionTestFun:any,
    description:any,
}

let QuestionTest:React.FC<PropsType> = ({...props}) =>{
    let isIgnoreTest = !!props ? props.isIgnoreTest:"";

    let [isHidden,SetIsHidden]= useState(!!props?.isHiddenContentTest);

    let image=new Image();
    image.src = img;
    if(props.images){
        image = new Image();
        image.src = 'data:image/png;base64,' + props.images;
    }
    return <div>
        <div className="row">
            <input className="form-control" value={props.name ?? ""} disabled/>
            <div className="row">
                <div className="d-flex flex-row-reverse ">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" value={isIgnoreTest} id="flexSwitchCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Пропускать этот вопрос</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <input className="btn btn-success" type="submit" value="Дальше" onClick={()=>{
                    props.QuestionTestFun(props.id,props.isIgnoreTest);
                }}/>
                <NavLink className="btn btn-warning"to={'/'} > Выход</NavLink>
            </div>
        </div>
        <div className="row ">
            <div className="col-sm-6">
                <div id="Test_Blok" className={isHidden ?"visually-hidden":""}>
                    <div dangerouslySetInnerHTML={{__html: props.description}}/>
                </div>
            </div>
            <div className="col-sm-6 ">
                <div id="ButtonFunTestBlok" className={!isHidden ? "visually-hidden": "row m-5"}>
                    <input className="btn btn-success col-12" type="button" onClick={()=>{SetIsHidden(false)}} value="Показать"/>
                </div>
                    <img src={image.src} style={{width: "100%"}} className={isHidden ? "visually-hidden": ""}/>


            </div>

        </div>
    </div>
}


export default  QuestionTest;