import React, { useEffect } from "react";
import Question from "./Question/Question";
import { usePagination } from "../../providers/Pagination/usePagination";
import { QuestionPageType, QuestionsType } from "../../http/models/api/question";
import { Cracker } from "../../redux/QuestionPage/types";

type Props = QuestionPageType & {
    create: () => void,
    openPage: (idParent: string, page: number, portionsSize: number, nameParent: string) => void,
    changePage: (cracker: Cracker) => void,
    openImg: (src: string) => void,
    redactAsk: (model: QuestionsType) => void,
    testStart: (id: string, title: string, type: string) => void,

    portionsSize: number,



    deleteAsk: (id: string, name: string) => void,
};

const Home: React.FC<Props> = ({ create, openPage, changePage, openImg, redactAsk, testStart, idParent, nameParent, page, questions, sizePage, portionsSize, deleteAsk }) => {
    const { Pagination, setPaginatio } = usePagination();

    const _openPage = (id: string, portionsSize: number, name: string) => {
        openPage(id, 1, portionsSize, name)
    }

    const _changePage = (page: number, portionsSize: number) => {
        changePage({ id: idParent, page, portionsSize, name: nameParent })
    }

    let Questions = questions?.map((question: QuestionsType, index: number) => {
        return <Question key={index} question={question} openPage={_openPage} portionsSize={portionsSize} testStart={testStart} openImg={openImg} redactAsk={redactAsk} deleteAsk={deleteAsk} />
    });

    useEffect(() => {
        setPaginatio({
            page,
            sizePage,
            portionsSize,
            changePage: _changePage
        });
    }, [page, sizePage, portionsSize]);// eslint-disable-line react-hooks/exhaustive-deps

    return <>
        <div className="d-flex flex-row-reverse">
            <button onClick={create} className="btn btn-success">Создать</button>
        </div>
        {Pagination}
        {Questions}
        {Pagination}
    </>
}




export default Home;