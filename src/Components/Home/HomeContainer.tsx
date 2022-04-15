import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import { AppStateType } from "../../redux/redux-store";
import { useEffect } from "react";
import { QuestionActionThunk } from "../../redux/Question/Question-Redux";
import { PaginationProvider } from "../../providers/Pagination/usePagination";
import { portionsSize } from "./initial-values";

export const HomeContainer = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: AppStateType) => {
        return state.QuestionReducer
    })

    const openPage=(idParent:string, page:number, portionsSize:number)=>{
        dispatch(QuestionActionThunk.setPageQuests(idParent, page, portionsSize));
    }

    useEffect(() => {
        dispatch(QuestionActionThunk.setPageQuests("", 1, portionsSize));
    }, []);
    
    return <PaginationProvider>
        <Home {...state} openPage={openPage} portionsSize={portionsSize}/>
    </PaginationProvider>
}
