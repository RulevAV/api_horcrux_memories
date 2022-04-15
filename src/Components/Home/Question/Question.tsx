import img from "../../../img/2T5qG95FFcs.jpg";
import { NavLink } from "react-router-dom";
import React from "react";
import { QueryType } from "../../../api/API_HorcruxMemories_Type";
import { propTypes } from "react-bootstrap/esm/Image";
import { Button, Card } from "react-bootstrap";
import moment from "moment-ru";
type PropTypes = {
    question: QueryType
    openPage: (idParent: string, portionsSize: number) => void
    portionsSize: number
}

const Question: React.FC<PropTypes> = ({ question, openPage, portionsSize }) => {
    let image = new Image();
    image.src = img;
    if (question.images) {
        image = new Image();
        image.src = 'data:image/png;base64,' + question.images;
    }

    const _openPage = () => {
        openPage(question.id, portionsSize)
    }

    return <Card className="mt-2">
        <Card.Header>
            <div className="row g-0">
                <div className="col"> {question.name}</div>
                <div className="col text-end"><span role="button" onClick={_openPage} >Открыть</span> <span className="ms-3"  role="button">Редактировать</span></div>
            </div>
        </Card.Header>
        <Card.Body>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-2">
                    <img onClick={_openPage} src={image.src} className="img-fluid rounded-start" />
                </div>
                <div className="col-12 col-sm-6 col-md-7 col-lg-8 col-xl-9 col-xxl-10">
                    <div className="card-body">
                        <h5 className="card-title">{question.name}</h5>
                        <p className="card-text"> {question.description}</p>
                        <p className="card-text"><small className="text-muted">{moment(question.dateAdd, "YYYYMMDD").format('LL')}</small></p>
                        <Button variant="primary" onClick={_openPage}>Открыть</Button>
                        <Button variant="primary">Редактировать</Button>
                    </div>
                </div>
            </div>
        </Card.Body>
    </Card>
}

export default Question;