import {useRef} from "react";


const Pagination = (props) =>{

    let mass=[];
    for(let i=1; i<=props.sizePage; i++)
    {
        if (props.page === i){
            mass.push(<li onClick={()=>{props.GetQuestsPagination(props.stories,i)}} className="page-item active">
                <a className="page-link">{i}</a>
            </li>)
        }
        else {
            mass.push(<li onClick={()=>{props.GetQuestsPagination(props.stories,i)}} className="page-item ">
                <a className="page-link">{i}</a>
            </li>)
        }
    }


    return <nav  className="d-flex justify-content-center " aria-label="Page navigation example">

        <div className="page-item"><a className="page-link" onClick={()=>{props.GetQuestsPagination(props.stories,props.page-1)}}>Previous</a>
        </div>
        <ul ref={props.Link} className="pagination Scroll m-0">
            {mass}

        </ul>
        <div className="page-item"><a className="page-link" onClick={()=>{props.GetQuestsPagination(props.stories,props.page+1)}}>Next</a>
        </div>

    </nav>

}

export default Pagination;