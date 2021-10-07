import {connect} from "react-redux";
import Home from "./Home";
import {compose} from "redux";
import {
    GetQuestsPaginationThunkCreator,
    GetQuestsReturnThunkCreator,
    GetQuestsThunkCreator,
} from "../../redux/Question-Redux";
import { SetIdRoot} from "../../redux/Test-Reducer";


let mapStateToProps = (state:any)=>{
    return {
        isAuthenticated : state.authReducer.Auth.isAuthenticated,
        DependOnParentQuestion: state.QuestionReducer.DependOnParentQuestion,
        stories:state.QuestionReducer.stories,
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
        GetQuests(IdParent:string, Page:number, PortionsSize:number){
            dispatch(GetQuestsThunkCreator(IdParent, Page, PortionsSize));
        },
        GetQuestsReturn(stories:any){
            dispatch(GetQuestsReturnThunkCreator(stories));
        },
        GetQuestsPagination(stories:any,Page:number){
            dispatch(GetQuestsPaginationThunkCreator(stories,Page));
        },
        SetAskTest(IdRoot:string){
            dispatch(SetIdRoot(IdRoot))
        }

    }
};

let HomeCompose = compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Home);
export default HomeCompose;
