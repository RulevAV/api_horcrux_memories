import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { QuestionsType } from "../../http/models/api/question";
import { useModalImg } from "../../providers/ModalImg/useModalImg";
import { RedactActionsThunk } from "../../redux/Redact/redact-Reducer";
import { AppStateType } from "../../redux/redux-store";
import Redact from "./Redact";

export const RedactContainer = () => {
  const { show } = useModalImg();
  const dispath = useDispatch();
  const redactReducer = useSelector((state: AppStateType) => {
    return state.redactReducer
  });

  const save = (model: QuestionsType) => {
    dispath(RedactActionsThunk.saveAsk(model));
  }
  const openImg = (src: string) => {
    show({ src });
  }

  if (!redactReducer.id) {
    return <Redirect to="/" />
}
  return <Redact openImg={openImg} redactReducer={redactReducer} save={save} />
}
