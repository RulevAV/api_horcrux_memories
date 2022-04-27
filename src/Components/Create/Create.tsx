import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postAsk } from "../../http/endpoints/question";
import { QuestionsType } from "../../http/models/api/question";
import { useModalImg } from "../../providers/ModalImg/useModalImg";
import { AppStateType } from "../../redux/redux-store";
import Redact from "../Redact/Redact";
import { parseAddQuestions } from "./dto";

const Create = () => {
    const { show } = useModalImg();
    const history = useHistory();

    const idParent = useSelector((state: AppStateType) => {
        return state.questionPageReducer.questionPage.idParent
    });

    const save = (model: QuestionsType) => {
        postAsk(parseAddQuestions(model,idParent));
        history.push("/")
    }
    const openImg = (src: string) => {
        show({ src });
    }

    return <Redact openImg={openImg} save={save} />

}

export default Create;