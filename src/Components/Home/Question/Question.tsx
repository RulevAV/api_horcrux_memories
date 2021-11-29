import img from "../../../img/2T5qG95FFcs.jpg";
import {NavLink} from "react-router-dom";
import React from "react";

const Question:React.FC<any> = (props) =>{

    let image=new Image();
    image.src = img;
    if(props.images){
        image = new Image();
        image.src = 'data:image/png;base64,' + props.images;
    }
    return <div key={props.id} className="row bg-secondary m-1 p-1 Question">
        <div className="col-sm-4 Question_img">
            <a onClick={()=>{props.GetQuests(props.id)}}>
                <img src={image.src} />
            </a>
        </div>
        <div className="col-sm-8 Question_Ask">
            <h3 className="text-white text-break">{props.name}</h3>
            <div className="text-white ckeditor" >
                <div dangerouslySetInnerHTML={{__html: props.description}}/>
            </div>
            <div className="row flex-row-reverse Question_Ask-buy">
                <a className="m-1 col-xs-12 col-lg-2 btn btn-light" onClick={()=>{props.GetQuests(props.id)}}>Открыть</a>
                <NavLink id={"TestNormal"} className="m-1 col-xs-12 col-lg-2 btn btn-primary" onClick={()=>{props.SetAskTest(props.id)}} to={'/Test/Normal'} > Начать тест</NavLink>
                <NavLink id={"TestGlobal"} className="m-1 col-xs-12 col-lg-4 btn btn-primary" onClick={()=>{props.SetAskTest(props.id)}} to={'/Test/Global'} > Начать подробный тест</NavLink>
            </div>
        </div>
    </div>
}

export default Question;