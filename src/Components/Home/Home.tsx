import React, {useEffect} from "react";
import Question from "./Question/Question";
import Pagination from "./Pagination/Pagination";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import {DependOnParentQuestionType, QueryType} from "../../api/API_HorcruxMemories_Type";
import {historyType} from "../../redux/Question-Redux";

type Props = {
    DependOnParentQuestion:DependOnParentQuestionType,
    stories:Array<historyType>,
    GetQuests:(IdParent?:string, Page?:number, PortionsSize?:number)=>void,
    ClearQuests:()=>void,
    SetEnableAllQuestions:(IdParent:string,isIgnore:boolean) =>void,
    GetQuestsReturn:(history:historyType) =>void,
    GetQuestsPagination:(history:historyType,Page:number) =>void,
    StartAsk:(IdRoot:string,nameTest:string)=>void,
}


const Home :React.FC<Props> = ({DependOnParentQuestion,
                                       stories,StartAsk,GetQuestsPagination,GetQuestsReturn,GetQuests,ClearQuests,SetEnableAllQuestions
}) =>{
    useEffect(()=>{
        GetQuests();
        return ()=>{
            ClearQuests();
        }
    },[]);
    let Questions = DependOnParentQuestion.questions?.map((question:QueryType,index:number)=>{
            return <Question key={index} SetEnableAllQuestions={SetEnableAllQuestions} SetRootTest={StartAsk} {...question} GetQuests={GetQuests} />
    });
    let isRender = !!(DependOnParentQuestion.questions?.length);
    return <div>
       <Breadcrumb stories={stories} GetQuestsReturn={GetQuestsReturn}/>
        {isRender?<>
            <Pagination GetQuestsPagination={GetQuestsPagination} stories={stories}
                        sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>
            {Questions}
            <Pagination GetQuestsPagination={GetQuestsPagination} stories={stories}
                                                         sizePage={DependOnParentQuestion.sizePage} page={DependOnParentQuestion.page}/>

        </>:null}
    </div>
}




export default Home;