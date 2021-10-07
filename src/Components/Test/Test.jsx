import React, {useEffect, useState} from "react";
import QuestionTest from "./QuestionTest/QuestionTest";


let Test = (props) =>{
    let State = props.Test;
    let question = State.Ask.question;
    useEffect(()=>{
        props.StartAsk(State.IdRoot,props.match.params.nameTest);
    },[])

    let QuestionTestFun = (id,isIgnoreTest) => {
        props.NextAsk(
            State.IdRoot,
            State.TestHistory,
            id,
            isIgnoreTest,
            props.match.params.nameTest
        );
        //nameTest={props.match.params.nameTest}
        // props.NextAsk(props.IdRoot,props.TestHistory,props.id,props.isIgnoreTest,props.nameTest);
    }

    return<div>
        <h1>Test</h1>
        <h3>{State.TestHistory.length+1 + "/" + State.Ask.sizeAsk}</h3>
        {
            question ?  <QuestionTest QuestionTestFun={QuestionTestFun} {...question} />:null
        }

    </div>

}

export  default  Test;