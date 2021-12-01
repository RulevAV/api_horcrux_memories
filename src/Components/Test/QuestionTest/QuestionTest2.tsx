import img from "../../../img/2T5qG95FFcs.jpg";
import  {NavLink} from "react-router-dom";
import {Card,Button,Image as BImage,Row,Col} from "react-bootstrap";

import React, {useEffect, useState} from "react";
import FormCheckInput from "./FormCheckInput/FormCheckInput";
import {QuestionTestType} from "../Test";


let QuestionTest:React.FC<QuestionTestType> = ({...props}) =>{
    let [isIgnoreTest,setIsIgnoreTest] = useState(props.question.isIgnoreTest);

    useEffect(()=>{
        setIsIgnoreTest(props.question.isIgnoreTest);
    },[props.question])

    let image=new Image();
    image.src = img;
    if(props.question.images){
        image = new Image();
        image.src = 'data:image/png;base64,' + props.question.images;
    }
    let description=props.question.description?props.question.description:"";

    return <div>
        <Row>
            <Col>
                <h1>{props.question.name}</h1>
                {props.question.isHiddenContentTest?<Button onClick={()=>{
                        props.ShowContent(false)}}>Показать контент!</Button>
                    :<div dangerouslySetInnerHTML={{__html: description}}>
                    </div>
                }
            </Col>
            <Col  md={5}>
                <Row>
                    <BImage src={image.src} fluid />
                </Row>
                <Row>
                    <FormCheckInput isIgnoreTest={isIgnoreTest} setIsIgnoreTest={setIsIgnoreTest}/>
                    <input className="btn btn-success" type="submit" value="Дальше" onClick={()=>{
                        props.QuestionTestFun(props.question.id,isIgnoreTest);
                    }}/>
                    <NavLink className="btn btn-warning"to={'/'} > Выход</NavLink>
                </Row>
            </Col>
        </Row>

    </div>
}


export default  QuestionTest;