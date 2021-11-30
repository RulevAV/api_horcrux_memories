import React from "react";
import {historyType} from "../../../redux/Question-Redux";

type PropsType = {
    id:string
    sizePage: number,
    page: number,
    stories: Array<historyType>,
    GetQuestsPagination: (stories: historyType, Page: number) => void,
    Link:  React.LegacyRef<HTMLUListElement>
}

let callItem=5;
const ItemInterval=(page:number,sizePage:number)=>{
    //Количество ячеек
    let balance = callItem%2;
    let call = Math.floor(callItem/2)
    let start = page-call+1-balance;//1-оставшейся ячейка
    let end = page+call;

    //коректируем интервал
    if(start<1)
    {
        let correct = 1-start;
        start=start+correct;
        end=end+correct;
        end = end>sizePage?sizePage:end;

    }else if(end>sizePage){
        let correct = sizePage-end;
        start=start+correct;
        end=end+correct;
    }

    return {start,end}
}


const PaginationConstructor:React.FC<PropsType> = ({id,sizePage,page,stories,GetQuestsPagination,Link}) =>{
    let mass=[];

    let {start,end} = ItemInterval(page,sizePage);
    let history = stories[stories.length-1];
    for(let i=start; i<=end; i++)
    {
        mass.push(<li key={i} className={"page-item "+(page === i?"active":"")}>
            <a onClick={()=>{GetQuestsPagination(history,i)}} className="page-link">{i}</a>
        </li>)
    }

    return <nav className="pagination-outer d-flex justify-content-center " aria-label="Page navigation">
        <ul className="pagination">
            <li className="page-item">
                <a onClick={()=>{GetQuestsPagination(history,page-5)}} href="#" className="page-link" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                </a>
            </li>
            {mass}
            <li className="page-item">
            <a onClick={()=>{GetQuestsPagination(history,page+5)}} href="#" className="page-link" aria-label="Next">
                <span aria-hidden="true">»</span>
            </a>
        </li>

        </ul>
    </nav>

}

export default PaginationConstructor;