import { useDispatch, useSelector } from "react-redux";

import { Redirect, useHistory } from "react-router-dom"
import Test from "./Test";

import { AppStateType } from "../../redux/redux-store";
import { TestActions, TestActionsThunk } from "../../redux/Test/Test-Reducer";
import { useModalAlert } from "../../providers/Alert/modal";
import { putAskData } from "../../http/data/user";

export const TestContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { show } = useModalAlert();

  const testReducer = useSelector((state: AppStateType) => {
    return state.testReducer
  });

  const breckTest = () => {
    dispatch(TestActionsThunk.breckTest(testReducer.id, testReducer.typeTest));
    show({
      title: "Тест прерван",
      variant: "info",
      dialogText: `Тест по теме "${testReducer.title}" закончен`
    });
    dispatch(TestActions.clearAsk());
    history.push("/");
  }

  const changeAsk = (isHiddenContentTest: boolean, isIgnoreTest: boolean) => {
    if (!testReducer.TestPage.question)
      return;

    const question = testReducer.TestPage.question;
    if (question.isHiddenContentTest !== isHiddenContentTest || question.isIgnoreTest !== isIgnoreTest)
      putAskData({ ...question, isHiddenContentTest, isIgnoreTest });
  }

  const askNext = () => {
    if (testReducer.TestPage.isFinith) {
      show({
        title: "Тест закончен",
        variant: "success",
        dialogText: `Тест по теме "${testReducer.title}" пройден`
      });
      dispatch(TestActions.clearAsk());
      history.push("/");
      return;
    }
    dispatch(TestActionsThunk.getAsk(testReducer.id, testReducer.typeTest));
  }

  if (!testReducer.id)
    return <Redirect to="/" />

  return <Test testReducer={testReducer} breckTest={breckTest} askNext={askNext} changeAsk={changeAsk} />
}
