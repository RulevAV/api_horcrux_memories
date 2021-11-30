import img from "../../../img/2T5qG95FFcs.jpg";
import  {NavLink} from "react-router-dom";
import {Card,Button,Image as BImage,Row,Col} from "react-bootstrap";

import React, {useEffect, useState} from "react";
import FormCheckInput from "./FormCheckInput/FormCheckInput";

type PropsType = {
    isIgnoreTest:boolean,
    isHiddenContentTest:boolean,
    images:string,
    name:string,
    id:string,
    QuestionTestFun:any,
    description:string,
    ShowContent:(value:boolean)=>void
}

let QuestionTest:React.FC<PropsType> = ({...props}) =>{


    let image=new Image();
    image.src = img;
    if(props.images){
        image = new Image();
        image.src = 'data:image/png;base64,' + props.images;
    }
    return <div>
        <Row>
            <Col>
                <h1>{props.name}</h1>
                {props.isHiddenContentTest?<Button onClick={()=>{
                        props.ShowContent(false)}}>Показать контент!</Button>
                    :<div dangerouslySetInnerHTML={{__html: props.description}}>
                    </div>
                }
            </Col>
            <Col  md={5}>
                <Row>
                    <BImage src={image.src} fluid />
                </Row>
                <Row>
                    <FormCheckInput isIgnoreTest={props.isIgnoreTest}/>
                    <input className="btn btn-success" type="submit" value="Дальше" onClick={()=>{
                        props.QuestionTestFun(props.id,props.isIgnoreTest);
                    }}/>
                    <NavLink className="btn btn-warning"to={'/'} > Выход</NavLink>
                </Row>
            </Col>
        </Row>

    </div>
}


export default  QuestionTest;