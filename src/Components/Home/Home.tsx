import React, {useEffect, useRef, useState} from "react";
import Question from "./Question/Question3";
import Pagination from "./Pagination/Pagination";
import {QueryType} from "../../redux/Question-Redux";
import {mapDispatchToPropsType, mapStateToPropsType, ownPropsType} from "./HomeContainer";
import {Row,Col} from "react-bootstrap";


type PropsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType;



const Home :React.FC<PropsType> = ({isAuthenticated,DependOnParentQuestion,
                                       stories,SetAskTest,GetQuestsPagination,GetQuestsReturn,GetQuests
}) =>{
    let P1 = useRef<any>();
    let P2 = useRef<any>();
    useEffect(()=>{
        GetQuests();
    },[]);
    useEffect(()=>{
        if (P1.current && P2.current){
            P1.current.onscroll = (e:any)=>{
                P2.current.scrollLeft=e.target.scrollLeft;
            }
            P2.current.onscroll = (e:any)=>{
                P1.current.scrollLeft=e.target.scrollLeft;
            }
        }
    },[P1.current,P2.current]);
    let Questions = DependOnParentQuestion.questions?.map((question:QueryType,index)=>{
            return <Question key={index} SetAskTest={SetAskTest} {...question} GetQuests={GetQuests} />
    });

    return <div>
        <h1>{ isAuthenticated? "Раздел: "+DependOnParentQuestion.nameParent:"Войдите в аккаунт"}</h1>
        <div className="row">
            <a id={"Return"} className="col-xs-12 col-sm-3 col-md-3 col-lg-2 col-xl-1 btn btn-success" onClick={()=>{GetQuestsReturn(stories);}}>Вернуться</a>
            <span className="col-xs-12 col-sm-5 col-md-6 col-lg-8 col-xl-9">Количество элементов {DependOnParentQuestion.sizeQuestions}</span>
        </div>
        <Pagination id={"Pagination1"} GetQuestsPagination={GetQuestsPagination} stories={stories} Link={P1} sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>
        {Questions}

            <Pagination id={"Pagination2"} GetQuestsPagination={GetQuestsPagination} stories={stories} Link={P2} sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>
    </div>
}




export default Home;