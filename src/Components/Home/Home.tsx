import React, {useEffect, useRef} from "react";
import Question from "./Question/Question";
import Pagination from "./Pagination/Pagination";
import {QueryType} from "../../redux/Question-Redux";
import {mapDispatchToPropsType, mapStateToPropsType, ownPropsType} from "./HomeContainer";



type PropsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType;



const Home :React.FC<PropsType> = ({isAuthenticated,DependOnParentQuestion,
                                       stories,SetAskTest,GetQuestsPagination,GetQuestsReturn,GetQuests
}) =>{

    useEffect(()=>{
        if(isAuthenticated && !DependOnParentQuestion.questions)
            GetQuests();
    },[isAuthenticated]);


    let Questions = DependOnParentQuestion.questions?.map((question:QueryType,index)=>{
            return <Question key={index} SetAskTest={SetAskTest} {...question} GetQuests={GetQuests} />
    });
    let P1 = useRef<any>();
    let P2 = useRef<any>();
    if (P1.current && P2.current){
          P1.current.onscroll = (e:any)=>{
          P2.current.scrollLeft=e.target.scrollLeft;
    }
          P2.current.onscroll = (e:any)=>{
          P1.current.scrollLeft=e.target.scrollLeft;
        }
    }

    return <div >
        <h1>{DependOnParentQuestion.nameParent}</h1>
        <div className="row">
            {
                stories.length>1
                    ?<a className="col-xs-12 col-sm-3 col-md-3 col-lg-2 col-xl-1 btn btn-success" onClick={()=>{GetQuestsReturn(stories);}}>Вернуться</a>
                    :null
            }

            <span className="col-xs-12 col-sm-5 col-md-6 col-lg-8 col-xl-9">Количество элементов {DependOnParentQuestion.sizeQuestions}</span>
        </div>
        <Pagination GetQuestsPagination={GetQuestsPagination} stories={stories} Link={P1} sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>
        {Questions}
        <Pagination GetQuestsPagination={GetQuestsPagination} stories={stories} Link={P2} sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>
    </div>
}




export default Home;