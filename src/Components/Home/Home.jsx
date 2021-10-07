import {useEffect, useRef} from "react";
import Question from "./Question/Question";
import Pagination from "./Pagination/Pagination";


const Home = (props) =>{

    useEffect(()=>{
        if(props.isAuthenticated)
            props.GetQuests();
    },[props.isAuthenticated]);


    let Questions = props.DependOnParentQuestion.questions?.map((question)=>{
            return <Question {...question} GetQuests={props.GetQuests} />
    });
    let P1 = useRef();
    let P2 = useRef();
    if (P1.current && P2.current){
          P1.current.onscroll = (e)=>{
        P2.current.scrollLeft=P1.current.scrollLeft;
    }
    P2.current.onscroll = (e)=>{
        P1.current.scrollLeft=P2.current.scrollLeft;
    }
    }


    return <div align="center">
        <h1>{props.DependOnParentQuestion.nameParent}</h1>
        <div className="row">
            {
                props.stories.length>1
                    ?<a className="col-xs-12 col-sm-3 col-md-3 col-lg-2 col-xl-1 btn btn-success" onClick={()=>{props.GetQuestsReturn(props.stories);}}>Вернуться</a>
                    :null
            }

            <span className="col-xs-12 col-sm-5 col-md-6 col-lg-8 col-xl-9">Количество элементов {props.DependOnParentQuestion.sizeQuestions}</span>
        </div>
        <Pagination GetQuestsPagination={props.GetQuestsPagination} stories={props.stories} Link={P1} GetQuests ={props.GetQuests}  sizePage={props.DependOnParentQuestion.sizePage} page={props.DependOnParentQuestion.page}/>
        {Questions}
        <Pagination GetQuestsPagination={props.GetQuestsPagination} stories={props.stories} Link={P2} GetQuests ={props.GetQuests} sizePage={props.DependOnParentQuestion.sizePage} page={props.DependOnParentQuestion.page}/>
    </div>
}




export default Home;