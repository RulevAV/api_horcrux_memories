import {historyType} from "../redux/Question-Redux";
import React from "react";

type propsType ={
    stories:Array<historyType>,
    GetQuestsReturn:(e:historyType)=>void
}

let Breadcrumb:React.FC<propsType> = ({stories,GetQuestsReturn})=>{
    let items = stories.map((e:historyType,i:number)=>{
        let lastItems = stories.length-1===i;
        if(!lastItems)
            return <li key={i} className="breadcrumb-item"><a onClick={()=>{GetQuestsReturn(e)}} className={"text-warning"} href="#">{e.name}</a></li>
        else
            return <li key={i} className="breadcrumb-item active" aria-current="page">{e.name}</li>
    })
    return<>
        <nav className={"m-3 fs-3"} aria-label="breadcrumb ">
            <ol className="breadcrumb">
                {items}
            </ol>
        </nav>
    </>
}

export default Breadcrumb;