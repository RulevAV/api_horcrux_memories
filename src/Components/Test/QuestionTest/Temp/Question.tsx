import img from "../../../../img/2T5qG95FFcs.jpg";
import  {NavLink} from "react-router-dom";
import {Button,Image as BImage,Row,Col} from "react-bootstrap";

import React, {useEffect, useState} from "react";
import FormCheckInput from "./FormCheckInput/FormCheckInput";
import {QueryType} from "../../../../api/API_HorcruxMemories_Type";

 type QuestionTestType ={
    question:QueryType,
    QuestionTestFun:(id:string,isIgnoreTest:boolean)=>void,
    ShowContent:(value:boolean)=>void
}

let Question:React.FC<QuestionTestType> = ({question,QuestionTestFun,ShowContent}) =>{
    let [isIgnoreTest,setIsIgnoreTest] = useState(question.isIgnoreTest);

    useEffect(()=>{
        setIsIgnoreTest(question.isIgnoreTest);
    },[question])

    let image=new Image();
    image.src = img;
    if(question.images){
        image = new Image();
        image.src = 'data:image/png;base64,' + question.images;
    }
    let description=question.description?question.description:"";

    return <div>
        <Row>
            <Col>
                <h1>{question.name}</h1>
                {question.isHiddenContentTest?<Button onClick={()=>{
                        ShowContent(false)}}>Показать контент!</Button>
                    :<div dangerouslySetInnerHTML={{__html: description}}>
                    </div>
                }
            </Col>
            <Col  md={5}>
                <Row>
                    <BImage src={image.src} className={"img"} />
                </Row>
                <Row>
                    <FormCheckInput isIgnoreTest={isIgnoreTest} setIsIgnoreTest={setIsIgnoreTest}/>
                    <input className="btn btn-success" type="submit" value="Дальше" onClick={()=>{
                        QuestionTestFun(question.id,isIgnoreTest);
                    }}/>
                    <NavLink className="btn btn-warning"to={'/'} > Выход</NavLink>
                </Row>
            </Col>
        </Row>

    </div>
}


export default  Question;
