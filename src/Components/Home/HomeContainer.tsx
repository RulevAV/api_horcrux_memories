import {connect} from "react-redux";
import Home from "./Home";
import {compose} from "redux";
import {
    DependOnParentQuestionType,
    GetQuestsPaginationThunkCreator,
    GetQuestsReturnThunkCreator,
    GetQuestsThunkCreator, historyType, QuestionAction, SetEnableAllQuestionsThunkCreator,
} from "../../redux/Question-Redux";
import {StartAskThunkCreator, TestActions} from "../../redux/Test-Reducer";
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
    SetRootTest:(IdRoot:string,nameTest:string)=> void,
    SetEnableAllQuestions:(IdRoot:string,isIgnore:boolean)=>void,
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
        SetEnableAllQuestions(IdParent:string,isIgnore:boolean){
          dispatch(SetEnableAllQuestionsThunkCreator(IdParent,isIgnore))
        },
        GetQuestsReturn(history:historyType){
            dispatch(GetQuestsReturnThunkCreator(history));
        },
        GetQuestsPagination(history:historyType,Page:number){
            dispatch(GetQuestsPaginationThunkCreator(history,Page));
        },
        SetRootTest(IdRoot:string,nameTest:string){
            dispatch(StartAskThunkCreator(IdRoot,nameTest));
        },
    }
};

let HomeCompose = compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    //mapStateToPropsType,mapDispatchToPropsType,ownPropsType,AppStateType
    connect<mapStateToPropsType,mapDispatchToPropsType,ownPropsType,AppStateType>(mapStateToProps,mapDispatchToProps)
)(Home);
export default HomeCompose;
