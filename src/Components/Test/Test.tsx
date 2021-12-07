import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {QuestionTest} from "./QuestionTest/QuestionTest";
import {TestType} from "../../redux/Test-Reducer";
import { match} from "react-router-dom";

type PropsTypeTest = {
    Test:TestType,
    match:match<{nameTest:string}>,
    NextAsk: (IdRoot: string, TestHistory: Array<string>, id: string, isIgnoreTest: boolean, nameTest: string) => void
    ShowContent:(value:boolean)=>void,
    SetIsFinish:(isFinish:boolean)=>void,
    TestClear:()=>void,
}

let Test : React.FC<PropsTypeTest> = ({...props}) =>{
    useEffect(()=>{
        return ()=>{
            props.SetIsFinish(true);
            props.TestClear();
        }
    },[]);
    if(props.Test.isFinish){
        return <Redirect to={"/"}/>
    }

    let QuestionTestFun = (id:string,isIgnoreTest:boolean) => {
        props.NextAsk(
            props.Test.IdRoot,
            props.Test.TestHistory,
            id,
            isIgnoreTest,
            props.match.params.nameTest
        );
    }


    return<div className={"text-white"}>
        <h1>Test</h1>
        <QuestionTest Ask={props.Test.Ask} ShowContent={props.ShowContent} QuestionTestFun={QuestionTestFun}  />
    </div>

}

export  default  Test;