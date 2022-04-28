import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import Loading from "./Loading";

const LoadingContainer: React.FC = ({ children }) => {
    const loader = useSelector((select: AppStateType) => {
        return select.loadingReducer.visible;
    });
    
    return <>
        {loader ? <Loading /> : null}
        {children}
    </>
}

export default LoadingContainer;