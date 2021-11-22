import React, {useEffect, useRef, useState} from "react";
import Question from "./Question/Question";
import Pagination from "./Pagination/Pagination";
import {QueryType} from "../../redux/Question-Redux";
import {mapDispatchToPropsType, mapStateToPropsType, ownPropsType} from "./HomeContainer";



type PropsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType;

const  getUser = () =>Promise.resolve({id:1,name:""});

const Home :React.FC<PropsType> = ({isAuthenticated,DependOnParentQuestion,
                                       stories,SetAskTest,GetQuestsPagination,GetQuestsReturn,GetQuests
}) =>{

    let [loading,setloading] = useState("");
    useEffect(()=>{
        getUser();
    },[]);

    useEffect(()=>{
        if(isAuthenticated)
        {
            const LoadQuestion = async ()=>{
                GetQuests();
                setloading("Загруженно");
            }
            LoadQuestion();
        }

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


    return <div>
        {loading && <h1>{loading}</h1>}
        <h1>{ isAuthenticated? "Раздел: "+DependOnParentQuestion.nameParent:"Войдите в аккаунт"}</h1>
        <div className="row">
            <a className="col-xs-12 col-sm-3 col-md-3 col-lg-2 col-xl-1 btn btn-success" onClick={()=>{GetQuestsReturn(stories);}}>Вернуться</a>
            <span className="col-xs-12 col-sm-5 col-md-6 col-lg-8 col-xl-9">Количество элементов {DependOnParentQuestion.sizeQuestions}</span>
        </div>

        <Pagination GetQuestsPagination={GetQuestsPagination} stories={stories} Link={P1} sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>
        {/*{Questions}*/}
        <Pagination GetQuestsPagination={GetQuestsPagination} stories={stories} Link={P2} sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>

    </div>
}




export default Home;