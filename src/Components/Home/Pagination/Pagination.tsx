import React from "react";

type storiesType = {
    idParent: string,
    page: number
}

type PropsType = {
    id:string
    sizePage: number,
    page: number,
    stories: Array<storiesType>,
    GetQuestsPagination: (stories: Array<storiesType>, Page: number) => void,
    Link:  React.LegacyRef<HTMLUListElement>
}


const Pagination:React.FC<PropsType> = ({id,sizePage,page,stories,GetQuestsPagination,Link}) =>{


    let mass=[];
    for(let i=1; i<=sizePage; i++)
    {
        if (page === i){
            mass.push(<li
                key={i} className="page-item active">
                <a onClick={()=>{GetQuestsPagination(stories,i)}} className="page-link">{i}</a>
            </li>)
        }
        else {
            mass.push(<li key={i} className="page-item ">
                <a  onClick={()=>{GetQuestsPagination(stories,i)}} className="page-link">{i}</a>
            </li>)
        }
    }


    return <nav id={id} className="d-flex justify-content-center " aria-label="Page navigation example">
        <div className="page-item"><a className="page-link" onClick={()=>{GetQuestsPagination(stories,page-1)}}>Previous</a>
        </div>
        <ul ref={Link} className="pagination Scroll m-0">
            {mass}

        </ul>
        <div className="page-item"><a className="page-link" onClick={()=>{GetQuestsPagination(stories,page+1)}}>Next</a>
        </div>

    </nav>

}

export default Pagination;