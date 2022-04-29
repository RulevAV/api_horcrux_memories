import { useDispatch, useSelector } from "react-redux";
import { QuestionActionThunk } from "../../redux/QuestionPage/QuestionPage-Redux";
import { Cracker } from "../../redux/QuestionPage/types";
import { AppStateType } from "../../redux/redux-store";
import { Pagination } from "./Pagination";

type propsType = {
    portionsSize:number
}

const PaginationContainer: React.FC<propsType> = ({portionsSize}) => {
    const dispatch = useDispatch();

    const questionPage = useSelector((state:AppStateType)=>{
        return state.questionPageReducer.questionPage
    })

    const changePage = (cracker: Cracker) => {
        dispatch(QuestionActionThunk.setPageQuests(cracker.id, cracker.page, cracker.portionsSize, cracker.name));
    }

    return <Pagination nameParent={questionPage.nameParent} idParent={questionPage.idParent} page={questionPage.page} sizePage={questionPage.sizePage} portionsSize={portionsSize} changePage={changePage} />
}

export default PaginationContainer;
