import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionsType } from "../../http/models/api/question";
import { useModalImg } from "../../providers/ModalImg/useModalImg";
import { useModalWindow } from "../../providers/ModalWindow/modal";
import { QuestionActionThunk } from "../../redux/QuestionPage/QuestionPage-Redux";
import { Cracker } from "../../redux/QuestionPage/types";
import { RedactActions } from "../../redux/Redact/redact-Reducer";
import { AppStateType } from "../../redux/redux-store";
import { TestActionsThunk } from "../../redux/Test/Test-Reducer";
import { portionsSize } from "../Home/initial-values";
import Questions from "./Questions";


export const QuestionsContainer = () => {
  const dispatch = useDispatch();
  const { show } = useModalImg();
  const confirm = useModalWindow();

  const questionPage = useSelector((state: AppStateType) => {
    return state.questionPageReducer.questionPage
  })

  const authReducer = useSelector((state: AppStateType) => {
    return state.authReducer;
  });

  const openPage = (idParent: string, page: number, portionsSize: number, nameParent: string) => {
    dispatch(QuestionActionThunk.setPageQuests(idParent, page, portionsSize, nameParent));
  }

  const openImg = (src: string) => {
    show({ src })
  }

  const redactAsk = (model: QuestionsType) => {
    dispatch(RedactActions.setRedact(model));
  }

  const testStart = (id: string, title: string, type: string) => {
    dispatch(TestActionsThunk.startTest(id, title, type));
  }

  const deleteAsk = (id: string, name: string) => {
    confirm.show({
      title: name,
      onApply: async () => {
        dispatch(QuestionActionThunk.deleteAsk(id, questionPage.idParent, questionPage.page, portionsSize))
      },
      dialogText: `Удалить ${name}?`,
      buttons: ["Отмена", "Удалить"]
    })
  }

  useEffect(() => {
    dispatch(QuestionActionThunk.setPageQuests("", 1, portionsSize, authReducer.email));
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const MemoQuestions = useMemo(() => <Questions openPage={openPage} openImg={openImg} redactAsk={redactAsk} testStart={testStart} {...questionPage} portionsSize={portionsSize} deleteAsk={deleteAsk} />, [questionPage]);// eslint-disable-line react-hooks/exhaustive-deps

  if (!questionPage.questions)
    return null;

  return MemoQuestions;
}

export default QuestionsContainer;