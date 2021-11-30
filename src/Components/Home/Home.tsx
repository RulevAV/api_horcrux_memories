import React, {useEffect, useRef, useState} from "react";
import Question from "./Question/Question3";
import Pagination from "./Pagination/Pagination2";
import {QueryType} from "../../redux/Question-Redux";
import {mapDispatchToPropsType, mapStateToPropsType, ownPropsType} from "./HomeContainer";
import {Row,Col} from "react-bootstrap";
import Breadcrumb from "../breadcrumb";


type PropsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType;



const Home :React.FC<PropsType> = ({isAuthenticated,DependOnParentQuestion,
                                       stories,SetAskTest,GetQuestsPagination,GetQuestsReturn,GetQuests,ClearQuests
}) =>{
    let P1 = useRef<any>();
    let P2 = useRef<any>();
    useEffect(()=>{
        GetQuests();
        return ()=>{
            ClearQuests();
        }
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
       <Breadcrumb stories={stories} GetQuestsReturn={GetQuestsReturn}/>
        <div className="row">
        </div>

        <Pagination id={"Pagination1"} GetQuestsPagination={GetQuestsPagination} stories={stories} Link={P1}
                    sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>
        {Questions}
       {/* {DependOnParentQuestion.questions? null
            : <Pagination id={"Pagination2"} GetQuestsPagination={GetQuestsPagination} stories={stories} Link={P1}
                          sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>
        }*/}  </div>
}




export default Home;