import {connect} from "react-redux";
import Home from "./Home";
import {compose} from "redux";
import {
    DependOnParentQuestionType,
    GetQuestsPaginationThunkCreator,
    GetQuestsReturnThunkCreator,
    GetQuestsThunkCreator, historyType, QuestionAction,
} from "../../redux/Question-Redux";
import { TestActions} from "../../redux/Test-Reducer";
import {AppStateType} from "../../redux/redux-store";

export type mapStateToPropsType = {
    isAuthenticated:boolean,
    DependOnParentQuestion:DependOnParentQuestionType
    stories:Array<historyType>
}
export type mapDispatchToPropsType = {
    GetQuests:(IdParent?:string, Page?:number, PortionsSize?:number) => void,
    ClearQuests:()=>void,
    GetQuestsReturn:(history:historyType)=> void,
    GetQuestsPagination:(history:historyType,Page:number)=> void,
    SetAskTest:(IdRoot:string)=> void,
}
export type ownPropsType = {
    pageTitle:string
}

let mapStateToProps = (state:any)=>{
    return {
        DependOnParentQuestion: state.QuestionReducer.DependOnParentQuestion,
        isAuthenticated : state.authReducer.Auth.isAuthenticated,
        stories:state.QuestionReducer.stories,
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
        GetQuests(IdParent?:string, Page?:number, PortionsSize?:number){
            dispatch(GetQuestsThunkCreator(IdParent, Page, PortionsSize));
        },
        ClearQuests(){
            dispatch(QuestionAction.ClearQuests())
        },
        GetQuestsReturn(history:historyType){
            dispatch(GetQuestsReturnThunkCreator(history));
        },
        GetQuestsPagination(history:historyType,Page:number){
            dispatch(GetQuestsPaginationThunkCreator(history,Page));
        },
        SetAskTest(IdRoot:string){
            dispatch(TestActions.SetIdRoot(IdRoot))
        }
    }
};

let HomeCompose = compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    //mapStateToPropsType,mapDispatchToPropsType,ownPropsType,AppStateType
    connect<mapStateToPropsType,mapDispatchToPropsType,ownPropsType,AppStateType>(mapStateToProps,mapDispatchToProps)
)(Home);
export default HomeCompose;
