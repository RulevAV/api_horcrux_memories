import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";

import { useHistory, withRouter } from "react-router-dom"
import Test from "./Test";

import { AppStateType } from "../../redux/redux-store";
import { useEffect } from "react";
import { TestActionsThunk } from "../../redux/Test/Test-Reducer";


export const TestContainer = () => {
    const dispatch = useDispatch();
    const testReducer = useSelector((state: AppStateType) => {
        return state.testReducer
    });

    useEffect(() => {
        if (testReducer.id)
            dispatch(TestActionsThunk.NextAsk(testReducer.id));
    }, [testReducer.id]);

    const history = useHistory();
    return <Test testReducer={testReducer} />
}
