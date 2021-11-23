import React, {useEffect} from "react";
import QuestionTest from "./QuestionTest/QuestionTest";

type PropsType = {
    Test:{
        Ask:any,
        IdRoot:any,
        TestHistory:any,
        id:string
    },
    match:any,
    StartAsk: (IdRoot: string, nameTest: string) => void,
    NextAsk: (IdRoot: string, TestHistory: Array<string>, id: string, isIgnoreTest: boolean, nameTest: string) => void
}
let Test : React.FC<PropsType> = ({...props}) =>{
    let State = props.Test;
    let question = State.Ask.question;
    useEffect(()=>{
        props.StartAsk(State.IdRoot,props.match.params.nameTest);
    },[])

    let QuestionTestFun = (id:string,isIgnoreTest:boolean) => {
        props.NextAsk(
            State.IdRoot,
            State.TestHistory,
            id,
            isIgnoreTest,
            props.match.params.nameTest
        );
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