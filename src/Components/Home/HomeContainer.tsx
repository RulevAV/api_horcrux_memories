import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { portionsSize } from "./initial-values";
import { Redirect, useHistory } from "react-router-dom";
import BreadcrumbContainer from "../Breadcrumb/BreadcrumbContainer";
import PaginationContainer from "../Pagination/PaginationContainer";
import QuestionsContainer from "../Questions/QuestionsContainer";

const HomeContainer = () => {
  const history = useHistory();

  const testReducer = useSelector((state: AppStateType) => {
    return state.testReducer
  });

  const redactReducer = useSelector((state: AppStateType) => {
    return state.redactReducer;
  });

  const create = () => {
    //history.push("/create");
  }

  if (testReducer.TestPage.question) {
    return <Redirect to="/Test" />
  }

  if (redactReducer.id) {
    return <Redirect to="/Redact" />
  }

  return <>
    <BreadcrumbContainer />
    <div className="d-flex flex-row-reverse">
      <button onClick={create} className="btn btn-success">Создать</button>
    </div>
    <PaginationContainer portionsSize={portionsSize} />
    <QuestionsContainer />
    <PaginationContainer portionsSize={portionsSize} />
  </>
}

export default HomeContainer;