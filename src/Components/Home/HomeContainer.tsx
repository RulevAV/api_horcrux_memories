import {connect} from "react-redux";
import Home from "./Home";
import {compose} from "redux";
import { QuestionAction, QuestionActionThunkCreator} from "../../redux/Question-Redux";

import {AppStateType} from "../../redux/redux-store";
import {TestActionsThunkCreator} from "../../redux/Test-Reducer";


let mapStateToProps = (state:AppStateType)=>{

    return {
        DependOnParentQuestion: state.QuestionReducer.DependOnParentQuestion,
        stories:state.QuestionReducer.stories,
    }
};


let HomeCompose = compose(
    connect(mapStateToProps, {
        GetQuests:QuestionActionThunkCreator.GetQuests,
        ClearQuests:QuestionAction.ClearQuests,
        SetEnableAllQuestions:QuestionActionThunkCreator.SetEnableAllQuestions,
        GetQuestsReturn:QuestionActionThunkCreator.GetQuestsReturn,
        GetQuestsPagination:QuestionActionThunkCreator.GetQuestsPagination,
        StartAsk:TestActionsThunkCreator.StartAsk,
    })
)(Home);
export default HomeCompose;
