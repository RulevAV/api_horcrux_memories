import React, {useEffect, useRef, useState} from "react";
import Question from "./Question/Question3";
import Pagination from "./Pagination/Pagination2";
import {QueryType} from "../../redux/Question-Redux";
import {mapDispatchToPropsType, mapStateToPropsType, ownPropsType} from "./HomeContainer";
import Breadcrumb from "../breadcrumb";


type PropsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType;



const Home :React.FC<PropsType> = ({isAuthenticated,DependOnParentQuestion,
                                       stories,SetRootTest,GetQuestsPagination,GetQuestsReturn,GetQuests,ClearQuests
}) =>{
    useEffect(()=>{
        GetQuests();
        return ()=>{
            ClearQuests();
        }
    },[]);
    let Questions = DependOnParentQuestion.questions?.map((question:QueryType,index)=>{
            return <Question key={index} SetRootTest={SetRootTest} {...question} GetQuests={GetQuests} />
    });
    let isRender = !!(DependOnParentQuestion.questions?.length);
    return <div>
       <Breadcrumb stories={stories} GetQuestsReturn={GetQuestsReturn}/>
        {isRender?<>
            <Pagination id={"Pagination1"} GetQuestsPagination={GetQuestsPagination} stories={stories}
                        sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>
            {Questions}
            <Pagination id={"Pagination2"} GetQuestsPagination={GetQuestsPagination} stories={stories}
                                                         sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>

        </>:null}
    </div>
}




export default Home;