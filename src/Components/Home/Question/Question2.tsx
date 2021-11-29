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
   /* <a className="m-1 col-xs-12 col-lg-2 btn btn-light" onClick={()=>{props.GetQuests(props.id)}}>Открыть</a>
    <NavLink id={"TestNormal"} className="m-1 col-xs-12 col-lg-2 btn btn-primary" onClick={()=>{props.SetAskTest(props.id)}} to={'/Test/Normal'} > Начать тест</NavLink>
    <NavLink id={"TestGlobal"} className="m-1 col-xs-12 col-lg-4 btn btn-primary" onClick={()=>{props.SetAskTest(props.id)}} to={'/Test/Global'} > Начать подробный тест</NavLink>
*/
    return  <Card border="success" className={"m-1"} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image.src} onClick={()=>{props.GetQuests(props.id)}}/>
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                <div dangerouslySetInnerHTML={{__html: props.description}}/>
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem className={"btn"} onClick={()=>{props.GetQuests(props.id)}}>Открыть</ListGroupItem>
            <ListGroupItem className={"btn"} onClick={()=>{props.SetAskTest(props.id)}}>Начать тест</ListGroupItem>
            <ListGroupItem className={"btn"} onClick={()=>{props.SetAskTest(props.id)}}>Начать подробный тест</ListGroupItem>
        </ListGroup>
        <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
    </Card>
}

export default Question;