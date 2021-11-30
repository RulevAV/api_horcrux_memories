import React, {useEffect} from "react";
import QuestionTest from "./QuestionTest/QuestionTest2";

type PropsType = {
    Test:{
        Ask:any,
        IdRoot:any,
        TestHistory:any,
        id:string
    },
    match:any,
    ShowContent:(value:boolean)=>void,
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
    return<div className={"text-white"}>
        <h1>Test</h1>
        <h3>{State.TestHistory.length+1 + "/" + State.Ask.sizeAsk}</h3>
        {
            question ?  <QuestionTest ShowContent={props.ShowContent} QuestionTestFun={QuestionTestFun} {...question} />:null
        }

    </div>

}

export  default  Test;