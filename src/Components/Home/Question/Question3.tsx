import img from "../../../img/2T5qG95FFcs.jpg";
import {NavLink} from "react-router-dom";
import {Card,ListGroup,ListGroupItem} from "react-bootstrap";
import React from "react";

const Question:React.FC<any> = (props) =>{

    let image=new Image();
    image.src = img;
    if(props.images){
        image = new Image();
        image.src = 'data:image/png;base64,' + props.images;
    }
    let Color = "green";//blue,red,green,yellow
   /* <a className="m-1 col-xs-12 col-lg-2 btn btn-light" onClick={()=>{props.GetQuests(props.id)}}>Открыть</a>
    <NavLink id={"TestNormal"} className="m-1 col-xs-12 col-lg-2 btn btn-primary" onClick={()=>{props.SetAskTest(props.id)}} to={'/Test/Normal'} > Начать тест</NavLink>
    <NavLink id={"TestGlobal"} className="m-1 col-xs-12 col-lg-4 btn btn-primary" onClick={()=>{props.SetAskTest(props.id)}} to={'/Test/Global'} > Начать подробный тест</NavLink>
*/
    return <article className={"postcard dark " + Color}>
        <a onClick={()=>{props.GetQuests(props.id)}} className="postcard__img_link" href="#">
            <img className="postcard__img" src={image.src} alt="Image Title"/>
        </a>
        <div className="postcard__text">
            <h1 className={"postcard__title "+Color}><a onClick={()=>{props.GetQuests(props.id)}} href="#">{props.name}</a></h1>
            <div className="postcard__subtitle small">
                <time dateTime="2020-05-25 12:00:00">
                    <i className="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
            </div>
            <div className="postcard__bar"></div>
            <div className="postcard__preview-txt" dangerouslySetInnerHTML={{__html: props.description}}>

            </div>
            <ul className="postcard__tagbox">
               {/* <a className="m-1 col-xs-12 col-lg-2 btn btn-light" onClick={()=>{props.GetQuests(props.id)}}>Открыть</a>

*/}
                <li className="tag__item">
                    <a onClick={()=>{props.GetQuests(props.id)}}>Открыть</a>
                </li>
                <li className={"tag__item play "+Color}>
                    <NavLink id={"TestNormal"} onClick={()=>{props.SetAskTest(props.id)}} to={'/Test/Normal'} > Начать тест</NavLink>
                </li>
                <li className={"tag__item play "+Color}>
                    <NavLink id={"TestGlobal"} onClick={()=>{props.SetAskTest(props.id)}} to={'/Test/Global'} > Начать подробный тест</NavLink>
                </li>
            </ul>
        </div>
    </article>
}

export default Question;