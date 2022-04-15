import React, { useEffect } from "react";
import Question from "./Question/Question";
//import Breadcrumb from "./Breadcrumb/Breadcrumb";
import { QueryType } from "../../api/API_HorcruxMemories_Type";
import { InitialStateType } from "../../redux/Question/types";
import { usePagination } from "../../providers/Pagination/usePagination";
import { portionsSize } from "./initial-values";
//import {historyType} from "../../redux/Question-Redux";

type Props = InitialStateType & {
    openPage: (idParent: string, page: number, portionsSize: number) => void,
    portionsSize: number
};

const Home: React.FC<Props> = ({ idParent, nameParent, page, questions, sizePage, sizeQuestions, openPage, portionsSize }) => {
    const { Pagination, setPaginatio } = usePagination();

    const _openPage = (id: string, portionsSize: number) => {
        openPage(id, 1, portionsSize)
    }

    const _changePage = (page: number, portionsSize: number) => {
        openPage(idParent, page, portionsSize)
    }

    let Questions = questions?.map((question: QueryType, index: number) => {
        return <Question key={index} question={question} openPage={_openPage} portionsSize={portionsSize} />
    });

    useEffect(() => {     
        setPaginatio({
            page,
            sizePage,
            portionsSize,
            changePage:_changePage
        });
    }, [page, sizePage, portionsSize]);

    return <div>
        {Pagination}
        {Questions}
        {Pagination}
    </div>
}




export default Home;