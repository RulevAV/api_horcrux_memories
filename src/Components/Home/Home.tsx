import React, { useEffect } from "react";
import Question from "./Question/Question";
import { usePagination } from "../../providers/Pagination/usePagination";
import { QuestionPageType, QuestionsType } from "../../http/models/api/question";
import { Cracker } from "../../redux/QuestionPage/types";

type Props = QuestionPageType & {
    openPage: (idParent: string, page: number, portionsSize: number) => void,
    portionsSize: number,
    addCracker: (cracker: Cracker) => void,
    testStart: (id: string, title: string) => void
};

const Home: React.FC<Props> = ({ idParent, nameParent, page, questions, sizePage, sizeQuestions, openPage, portionsSize, addCracker, testStart }) => {
    const { Pagination, setPaginatio } = usePagination();

    const _openPage = (id: string, portionsSize: number, name: string) => {
        addCracker({ id, page: 1, portionsSize, name });
        openPage(id, 1, portionsSize)
    }

    const _changePage = (page: number, portionsSize: number) => {
        openPage(idParent, page, portionsSize)
    }

    let Questions = questions?.map((question: QuestionsType, index: number) => {
        return <Question key={index} question={question} openPage={_openPage} portionsSize={portionsSize} testStart={testStart} />
    });

    useEffect(() => {
        setPaginatio({
            page,
            sizePage,
            portionsSize,
            changePage: _changePage
        });
    }, [page, sizePage, portionsSize]);

    return <>
        {Pagination}
        {Questions}
        {Pagination}
    </>
}




export default Home;