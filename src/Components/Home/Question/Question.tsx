import img from "../../../img/2T5qG95FFcs.jpg";
import {NavLink} from "react-router-dom";
import React from "react";

const Question:React.FC<any> = (props) =>{

    let image=new Image();
    image.src = img;
    if(props.images){
        image = new Image();
        image.src = 'data:image/png;base64,' + props.images;
    }
    //blue,red,green,yellow
    let Color = !props.isIgnoreTest?"green":"red";
    let theme = "dark";//light,dark
    let postcard = "";//theme==="light"?"t-dark":""
    let date = new Date( Date.parse(props.dateAdd) );



    return <article className={"postcard "+ theme + " " + Color}>
        <a onClick={()=>{props.GetQuests(props.id)}} className="Question_img postcard__img_link" href="#">
            <img  className="postcard__img" src={image.src} alt="Image Title"/>
        </a>
        <div className={"postcard__text " + postcard}>
            <h1 className={"postcard__title "+Color}><a onClick={()=>{props.GetQuests(props.id)}} href="#">{props.name}</a></h1>
            <div className="postcard__subtitle small">
                <time dateTime={props.dateAdd}>
                    <i className="bi bi-calendar3 " aria-hidden="true"></i> Дата создания {date.getFullYear() +"/"+date.getMonth()+"/"+date.getDay() }
                </time>

            </div>
            <div className="postcard__bar"></div>
            <div className="postcard__preview-txt" dangerouslySetInnerHTML={{__html: props.description}}>

            </div>
            <ul className="postcard__tagbox">

                <li className="tag__item">
                    <a onClick={()=>{props.SetEnableAllQuestions(props.id,false)}}>Включить все вопросы в тест </a>
                </li>
                <li className="tag__item">
                    <a onClick={()=>{props.SetEnableAllQuestions(props.id,true)}}>Исключить все вопросы в тест </a>
                </li>
                <li className={"tag__item play "+Color}>
                    <NavLink id={"TestNormal"} onClick={()=>{props.SetRootTest(props.id,"Normal")}} to={'/Test/Normal'} > Начать тест</NavLink>
                </li>
                <li className={"tag__item play "+Color}>
                    <NavLink id={"TestGlobal"} onClick={()=>{props.SetRootTest(props.id,"Global")}} to={'/Test/Global'} > Начать подробный тест</NavLink>
                </li>
            </ul>
        </div>
    </article>
}

export default Question;