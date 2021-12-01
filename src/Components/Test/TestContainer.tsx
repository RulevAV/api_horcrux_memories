import {connect} from "react-redux";
import {compose} from "redux";

import { withRouter} from "react-router-dom"
import Test from "./Test";
import {
    NextAskThunkCreator,
    TestActions, TestType,
} from "../../redux/Test-Reducer";
import {AppStateType} from "../../redux/redux-store";

export type PropsTypeTest = {
    Test:TestType,
    match:any,
    ShowContent:(value:boolean)=>void,
    SetFinishFalse:()=>void,
    NextAsk: (IdRoot: string, TestHistory: Array<string>, id: string, isIgnoreTest: boolean, nameTest: string) => void
}

let mapStateToProps = (state:AppStateType)=>{
    return {
        Test:state.TestReducer
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
        NextAsk(IdRoot:string,TestHistory:Array<string>,id:string ,isIgnoreTest:boolean,nameTest:string){
            dispatch(NextAskThunkCreator(IdRoot,TestHistory,id,isIgnoreTest,nameTest));
        },
        ShowContent(value:boolean){
            dispatch(TestActions.ShowContent(value));
        },
        SetFinishFalse(){
            dispatch(TestActions.SetIsFinish(false));
        },
    }
};


let TestCompose = compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Test);

let WithTestContainer = withRouter(TestCompose);
export default WithTestContainer;
