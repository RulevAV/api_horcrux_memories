import {connect} from "react-redux";
import {compose} from "redux";

import { withRouter} from "react-router-dom"
import Test from "./Test";
import {
    TestActions, TestActionsThunkCreator,
} from "../../redux/Test-Reducer";
import {AppStateType} from "../../redux/redux-store";


export const TestContainer = ()=>{
    return <>TestContainer</>
}
