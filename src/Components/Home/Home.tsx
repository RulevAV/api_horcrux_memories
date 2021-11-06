import React, {useEffect, useRef} from "react";
import Question from "./Question/Question";
import Pagination from "./Pagination/Pagination";

type storiesType = {
    idParent: string,
    page: number
}

type QueryType = {
    dateAdd:string,
    description: null|string,
    id:string,
    idParent:string,
    images:string,
    isHiddenContentTest: boolean
    isIgnoreTest: boolean
    name:string,
}

type storeQuest = {
    idParent:string,
    nameParent: string,
    page: number,
    questions: Array<QueryType>,
    sizePage: number,
    sizeQuestions: number
}

type PropsType = {
    isAuthenticated:boolean,
    DependOnParentQuestion:storeQuest,
    stories: Array<storiesType>,
    SetAskTest:(IdRoot:string)=>void,
    GetQuestsReturn:(stories:Array<storiesType>)=>void,
    GetQuests:(IdParent?:string, Page?:number, PortionsSize?:number)=>void,
    GetQuestsPagination:(stories: Array<storiesType>, Page: number) => void,


}

const Home :React.FC<PropsType> = ({...props}) =>{

    useEffect(()=>{
        if(props.isAuthenticated && !props.DependOnParentQuestion.questions)
            props.GetQuests();
    },[props.isAuthenticated]);


    let Questions = props.DependOnParentQuestion.questions?.map((question:QueryType)=>{
            return <Question SetAskTest={props.SetAskTest} {...question} GetQuests={props.GetQuests} />
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
        <h1>{props.DependOnParentQuestion.nameParent}</h1>
        <div className="row">
            {
                props.stories.length>1
                    ?<a className="col-xs-12 col-sm-3 col-md-3 col-lg-2 col-xl-1 btn btn-success" onClick={()=>{props.GetQuestsReturn(props.stories);}}>Вернуться</a>
                    :null
            }

            <span className="col-xs-12 col-sm-5 col-md-6 col-lg-8 col-xl-9">Количество элементов {props.DependOnParentQuestion.sizeQuestions}</span>
        </div>
        <Pagination GetQuestsPagination={props.GetQuestsPagination} stories={props.stories} Link={P1} sizePage={props.DependOnParentQuestion.sizePage} page={props.DependOnParentQuestion.page}/>
        {Questions}
        <Pagination GetQuestsPagination={props.GetQuestsPagination} stories={props.stories} Link={P2} sizePage={props.DependOnParentQuestion.sizePage} page={props.DependOnParentQuestion.page}/>
    </div>
}




export default Home;