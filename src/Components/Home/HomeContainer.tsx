import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import { AppStateType } from "../../redux/redux-store";
import { useEffect } from "react";
import { QuestionActionThunk } from "../../redux/QuestionPage/QuestionPage-Redux";
import { PaginationProvider } from "../../providers/Pagination/usePagination";
import { portionsSize } from "./initial-values";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { Cracker } from "../../redux/QuestionPage/types";
import { Redirect, useHistory } from "react-router-dom";
import { TestActionsThunk } from "../../redux/Test/Test-Reducer";
import { useModalImg } from "../../providers/ModalImg/useModalImg";
import { QuestionsType } from "../../http/models/api/question";
import { RedactActions } from "../../redux/Redact/redact-Reducer";
import { useModalWindow } from "../../providers/ModalWindow/modal";

export const HomeContainer = () => {
    const dispatch = useDispatch();
    const { show } = useModalImg();
    const history = useHistory();
    const confirm = useModalWindow();

    const { questionPage, breadcrumb } = useSelector((state: AppStateType) => {
        return state.questionPageReducer
    })

    const testReducer = useSelector((state: AppStateType) => {
        return state.testReducer
    });

    const redactReducer = useSelector((state: AppStateType) => {
        return state.redactReducer;
    });

    const authReducer = useSelector((state: AppStateType) => {
        return state.authReducer;
    });

    const create = () => {
        history.push("/create");
    }

    const openPage = (idParent: string, page: number, portionsSize: number, nameParent: string) => {
        dispatch(QuestionActionThunk.setPageQuests(idParent, page, portionsSize, nameParent, breadcrumb));
    }

    const changePage = (cracker: Cracker) => {
        const index = breadcrumb.indexOf(cracker);
        const mass = breadcrumb.slice(0, index);
        dispatch(QuestionActionThunk.setPageQuests(cracker.id, cracker.page, cracker.portionsSize, cracker.name, mass));
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
        dispatch(QuestionActionThunk.setPageQuests("", 1, portionsSize, authReducer.email, []));
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    if (testReducer.TestPage.question) {
        return <Redirect to="/Test" />
    }

    if (redactReducer.id) {
        return <Redirect to="/Redact" />
    }

    return <PaginationProvider>
        <Breadcrumb breadcrumb={breadcrumb} changePage={changePage} />
        <Home create={create} openPage={openPage} changePage={changePage} openImg={openImg} redactAsk={redactAsk} testStart={testStart} {...questionPage} portionsSize={portionsSize} deleteAsk={deleteAsk} />
    </PaginationProvider>
}
