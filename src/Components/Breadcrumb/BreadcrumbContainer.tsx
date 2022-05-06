import { useDispatch, useSelector } from "react-redux";
import { QuestionActionThunk } from "../../redux/QuestionPage/QuestionPage-Redux";
import { Cracker } from "../../redux/QuestionPage/types";
import { AppStateType } from "../../redux/redux-store";
import Breadcrumb from "./Breadcrumb";

type propsType = {
}

const BreadcrumbContainer: React.FC<propsType> = () => {
  const dispatch = useDispatch();

  const breadcrumb = useSelector((state: AppStateType) => {
    return state.questionPageReducer.breadcrumb
  })
  const changePage = (cracker: Cracker) => {
    dispatch(QuestionActionThunk.setPageQuests(cracker.id, cracker.page, cracker.portionsSize, cracker.name));
  }
  return <Breadcrumb changePage={changePage} breadcrumb={breadcrumb} />
}

export default BreadcrumbContainer;
