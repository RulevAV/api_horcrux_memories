import {connect} from "react-redux";
import Home from "./Home";
import {compose} from "redux";
import {
    GetQuestsPaginationThunkCreator,
    GetQuestsReturnThunkCreator,
    GetQuestsThunkCreator,
} from "../../redux/Question-Redux";
import { SetIdRoot} from "../../redux/Test-Reducer";
import {AppStateType} from "../../redux/redux-store";
import {WithAuthRedirect} from "../hoc/AuthRedirect";

type storiesType = {
    idParent: string,
    page: number
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
        GetQuestsReturn(stories:Array<storiesType>){
            dispatch(GetQuestsReturnThunkCreator(stories));
        },
        GetQuestsPagination(stories:Array<storiesType>,Page:number){
            dispatch(GetQuestsPaginationThunkCreator(stories,Page));
        },
        SetAskTest(IdRoot:string){
            dispatch(SetIdRoot(IdRoot))
        }
    }
};

let HomeCompose = compose(
    WithAuthRedirect,
    connect(mapStateToProps,mapDispatchToProps)
)(Home);
export default HomeCompose;
