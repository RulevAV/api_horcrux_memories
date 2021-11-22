import {connect} from "react-redux";
import Home from "./Home";
import {compose} from "redux";
import {
    DependOnParentQuestionType,
    GetQuestsPaginationThunkCreator,
    GetQuestsReturnThunkCreator,
    GetQuestsThunkCreator, historyType,
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
    GetQuestsReturn:(stories:Array<historyType>)=> void,
    GetQuestsPagination:(stories:Array<historyType>,Page:number)=> void,
    SetAskTest:(IdRoot:string)=> void,
}
export type ownPropsType = {
    pageTitle:string
}

let mapStateToProps = (state:any)=>{
    return {
        isAuthenticated : state.authReducer.Auth.isAuthenticated,
        DependOnParentQuestion: state.QuestionReducer.DependOnParentQuestion,
        stories:state.QuestionReducer.stories,
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
        GetQuests(IdParent?:string, Page?:number, PortionsSize?:number){
            dispatch(GetQuestsThunkCreator(IdParent, Page, PortionsSize));
        },
        GetQuestsReturn(stories:Array<historyType>){
            dispatch(GetQuestsReturnThunkCreator(stories));
        },
        GetQuestsPagination(stories:Array<historyType>,Page:number){
            dispatch(GetQuestsPaginationThunkCreator(stories,Page));
        },
        SetAskTest(IdRoot:string){
            dispatch(TestActions.SetIdRoot(IdRoot))
        }
    }
};

let HomeCompose = compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<mapStateToPropsType,mapDispatchToPropsType,ownPropsType,AppStateType>(mapStateToProps,mapDispatchToProps)
)(Home);
export default HomeCompose;
