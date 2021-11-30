import {connect} from "react-redux";
import {compose} from "redux";

import { withRouter} from "react-router-dom"
import Test from "./Test";
import {
    NextAskThunkCreator,
    StartAskThunkCreator, TestActions,
} from "../../redux/Test-Reducer";


let mapStateToProps = (state:any)=>{
    return {
        Test:state.TestReducer
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
        StartAsk(IdRoot:string,nameTest:string){
            dispatch(StartAskThunkCreator(IdRoot,nameTest));
        },
        NextAsk(IdRoot:string,TestHistory:Array<string>,id:string ,isIgnoreTest:boolean,nameTest:string){
            dispatch(NextAskThunkCreator(IdRoot,TestHistory,id,isIgnoreTest,nameTest));
        },
        ShowContent(value:boolean){
            dispatch(TestActions.ShowContent(value));
        },
    }
};


let TestCompose = compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Test);

let WithTestContainer = withRouter(TestCompose);
export default WithTestContainer;
