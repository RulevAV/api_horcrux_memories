import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { match } from "react-router-dom";
import { TestPageType } from "../../http/models/api/question";
import { TestType } from "../../redux/Test/Test-Reducer";

import { Question } from "./Question/Question";
type PropsTypeTest = {
    testReducer: TestType
    // Test:TestType,
    // match:match<{nameTest:string}>,
    // NextAsk: (IdRoot: string, TestHistory: Array<string>, id: string, isIgnoreTest: boolean, nameTest: string) => void
    // ShowContent:(value:boolean)=>void,
    // SetIsFinish:(isFinish:boolean)=>void,
    // TestClear:()=>void,
}

let Test: React.FC<PropsTypeTest> = ({ testReducer }) => {
    

    // useEffect(()=>{
    //     return ()=>{
    //         props.SetIsFinish(true);
    //         props.TestClear();
    //     }
    // },[]);
    // if(props.Test.isFinish){
    //     return <Redirect to={"/"}/>
    // }

    // let QuestionTestFun = (id:string,isIgnoreTest:boolean) => {
    //     props.NextAsk(
    //         props.Test.IdRoot,
    //         props.Test.TestHistory,
    //         id,
    //         isIgnoreTest,
    //         props.match.params.nameTest
    //     );
    // }


    return <div >
        <h1>{testReducer.title}</h1>
        {
            testReducer.TestPage.question?<Question question={testReducer.TestPage.question}/>:null
        }
       
    </div>

}

export default Test;