import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import { AppStateType } from "../../redux/redux-store";
import { useEffect } from "react";
import { QuestionAction, QuestionActionThunk } from "../../redux/QuestionPage/QuestionPage-Redux";
import { PaginationProvider } from "../../providers/Pagination/usePagination";
import { portionsSize } from "./initial-values";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { Cracker } from "../../redux/QuestionPage/types";
import { useHistory } from "react-router-dom";
import { TestActionsThunk } from "../../redux/Test/Test-Reducer";
import { useModalImg } from "../../providers/ModalImg/useModalImg";
import { QuestionsType } from "../../http/models/api/question";
import { RedactActions } from "../../redux/Redact/redact-Reducer";
import { deleteAskApi } from "../../http/endpoints/question";
import { useModalWindow } from "../../providers/ModalWindow/modal";

export const HomeContainer = () => {
    const dispatch = useDispatch();
    const { show } = useModalImg();
    const history = useHistory();


    const confirm = useModalWindow();

    const create = () => {
        history.push("/create");
    }

    const { questionPage, breadcrumb } = useSelector((state: AppStateType) => {
        return state.questionPageReducer
    })

    const testReducer = useSelector((state: AppStateType) => {
        return state.testReducer
    });

    const openImg = (src: string) => {
        show({ src })
    }

    const redactAsk = (model: QuestionsType) => {
        dispatch(RedactActions.setRedact(model));
        history.push('/redact');
    }

    const openPage = (idParent: string, page: number, portionsSize: number) => {
        dispatch(QuestionActionThunk.setPageQuests(idParent, page, portionsSize));
    }

    const addCracker = (cracker: Cracker) => {
        dispatch(QuestionAction.addCracker(cracker));
    }

    const directPage = (cracker: Cracker) => {
        dispatch(QuestionAction.deleteCracker(cracker));
        dispatch(QuestionActionThunk.setPageQuests(cracker.id, cracker.page, cracker.portionsSize));
    }

    const testStart = (id: string, title: string, type: string) => {
        dispatch(TestActionsThunk.startTest(id, title, type));
    }

    const deleteAsk = (id: string, name: string) => {
        confirm.show({
            email: name,
            onApply: async () => {
                await deleteAskApi(id);

                if (breadcrumb.length) {
                    const last = breadcrumb[breadcrumb.length - 1];
                    dispatch(QuestionActionThunk.setPageQuests(last.id, last.page, portionsSize));
                }
                else {
                    addCracker({ id: "", page: 1, portionsSize, name: "Главная" });
                    dispatch(QuestionActionThunk.setPageQuests("", 1, portionsSize));
                }
            },
            dialogText: `Удалить ${name}?`
        })
    }

    useEffect(() => {
        if (testReducer.TestPage.question)
            history.push("/Test");
    }, [testReducer])

    useEffect(() => {
        if (breadcrumb.length) {
            const last = breadcrumb[breadcrumb.length - 1];
            dispatch(QuestionActionThunk.setPageQuests(last.id, last.page, portionsSize));
        }
        else {
            addCracker({ id: "", page: 1, portionsSize, name: "Главная" });
            dispatch(QuestionActionThunk.setPageQuests("", 1, portionsSize));
        }

        return () => {
        }
    }, []);

    return <PaginationProvider>
        <Breadcrumb breadcrumb={breadcrumb} directPage={directPage} />
        <Home {...questionPage} create={create} openPage={openPage} addCracker={addCracker} portionsSize={portionsSize} testStart={testStart} openImg={openImg} redactAsk={redactAsk} deleteAsk={deleteAsk} />
    </PaginationProvider>
}
