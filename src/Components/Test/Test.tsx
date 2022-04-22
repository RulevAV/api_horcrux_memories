import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { TestType } from "../../redux/Test/Test-Reducer";

import { Question } from "./Question/Question";
type PropsTypeTest = {
    testReducer: TestType,
    askNext: () => void
    breckTest: () => void,
    changeAsk: (isHiddenContentTest: boolean, isIgnoreTest: boolean) => void
}

let Test: React.FC<PropsTypeTest> = ({ testReducer, askNext, breckTest, changeAsk }) => {
    const [isIgnoreTest, setIsIgnoreTest] = useState(!!testReducer.TestPage.question?.isIgnoreTest);
    const [isHiddenContentTest, setisHiddenContentTest] = useState(!!testReducer.TestPage.question?.isHiddenContentTest);

    useEffect(() => {
        setIsIgnoreTest(!!testReducer.TestPage.question?.isIgnoreTest);
        setisHiddenContentTest(!!testReducer.TestPage.question?.isHiddenContentTest);
    }, [testReducer])
    
    return <div >
        <h1>{testReducer.title + " " + testReducer.TestPage.passedAsk + "/" + testReducer.TestPage.sizeAsk}</h1>
        {
            testReducer.TestPage.question ? <Question question={testReducer.TestPage.question} isIgnoreTest={isIgnoreTest} setIsIgnoreTest={setIsIgnoreTest} isHiddenContentTest={isHiddenContentTest} setisHiddenContentTest={setisHiddenContentTest} /> : null
        }
        <Button className="m-2" onClick={() => { changeAsk(isIgnoreTest, isHiddenContentTest) }}>Сохранить изменения</Button>
        <Button className="m-2" onClick={breckTest}>Закончить тест</Button>
        <Button className="m-2" onClick={askNext}>Дальше</Button>
    </div>

}

export default Test;