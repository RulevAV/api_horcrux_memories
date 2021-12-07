import {connect} from "react-redux";
import {compose} from "redux";

import { withRouter} from "react-router-dom"
import Test from "./Test";
import {
    TestActions, TestActionsThunkCreator,
} from "../../redux/Test-Reducer";
import {AppStateType} from "../../redux/redux-store";


let mapStateToProps = (state:AppStateType)=>{
    return {
        Test:state.TestReducer
    }
};

let TestCompose = compose(connect(mapStateToProps,{
        NextAsk:TestActionsThunkCreator.NextAsk,
        ShowContent:TestActions.ShowContent,
        SetIsFinish:TestActions.SetIsFinish,
        TestClear:TestActions.TestClear,
    })
)(Test);

let WithTestContainer = withRouter(TestCompose);
export default WithTestContainer;
