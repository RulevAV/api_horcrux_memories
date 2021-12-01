import React, {useEffect} from "react";
import QuestionTest from "./QuestionTest/QuestionTest2";
import {PropsTypeTest} from "./TestContainer";
import {QueryType} from "../../redux/Question-Redux";
import {Redirect} from "react-router-dom";

export type QuestionTestType ={
    question:QueryType,
    QuestionTestFun:(id:string,isIgnoreTest:boolean)=>void,
    ShowContent:(value:boolean)=>void
}

let Test : React.FC<PropsTypeTest> = ({...props}) =>{
    useEffect(()=>{
        return ()=>{
            props.SetFinishFalse();
        }
    },[]);

    let QuestionTestUI;

    let QuestionTestFun = (id:string,isIgnoreTest:boolean) => {
        props.NextAsk(
            props.Test.IdRoot,
            props.Test.TestHistory,
            id,
            isIgnoreTest,
            props.match.params.nameTest
        );
    }

    if(props.Test.Ask.question){
        QuestionTestUI = <QuestionTest question={props.Test.Ask.question} ShowContent={props.ShowContent} QuestionTestFun={QuestionTestFun}/>;
    }
    if(props.Test.isFinish){
        return <Redirect to={"/"}/>
    }
    return<div className={"text-white"}>
        <h1>Test</h1>
        {
            props.Test.Ask.sizeAsk!==0?<>
                    <h3>{props.Test.TestHistory.length+1 + "/" + props.Test.Ask.sizeAsk}</h3>
                    {QuestionTestUI}
                     </>
                :null
        }


    </div>

}

export  default  Test;