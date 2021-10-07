import {connect} from "react-redux";
import {compose} from "redux";

import { withRouter} from "react-router-dom"
import Test from "./Test";
import {
    NextAskThunkCreator,
    StartAskThunkCreator,
} from "../../redux/Test-Reducer";
import {TestRedirect} from "../hoc/TestRedirect";


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
    }
};


let TestCompose = compose(
    TestRedirect,
    connect(mapStateToProps,mapDispatchToProps)
)(Test);

let WithTestContainer = withRouter(TestCompose);
export default WithTestContainer;
