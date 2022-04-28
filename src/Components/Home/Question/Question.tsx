import img from "../../../img/2T5qG95FFcs.jpg";
import React from "react";
import { Button, Card } from "react-bootstrap";
import moment from "moment-ru";
import { QuestionsType } from "../../../http/models/api/question";

type PropTypes = {
    question: QuestionsType
    openPage: (idParent: string, portionsSize: number, name: string) => void
    portionsSize: number,
    testStart: (id: string, title: string, type: string) => void
    openImg: (src: string) => void,
    redactAsk: (model: QuestionsType) => void,
    deleteAsk: (id: string, name: string) => void
}

const Question: React.FC<PropTypes> = ({ question, openPage, portionsSize, testStart, openImg, redactAsk, deleteAsk }) => {
    let image = new Image();
    image.src = img;
    if (question.images) {
        image = new Image();
        image.src = 'data:image/png;base64,' + question.images;
    }
    //Redact
    const _openImg = () => {
        openImg(image.src)
    }

    const _redactAsk = () => {
        redactAsk(question);
    }

    const _openPage = () => {
        openPage(question.id, portionsSize, question.name)
    }

    const _testStartNormal = () => {
        testStart(question.id, question.name, 'normal');
    }

    const _testStartGlobal = () => {
        testStart(question.id, question.name, 'global');
    }

    const _deleteAsk = () => {
        deleteAsk(question.id,question.name);
    }

    return <Card className="mt-2">
        <Card.Header>
            <div className="row g-0">
                <div className="col"> {question.name}</div>
                <div className="col text-end"><span role="button" onClick={_openPage} >Открыть</span> <span onClick={_redactAsk} className="ms-3" role="button">Редактировать</span> <span className="ms-3" role="button" onClick={_deleteAsk}>Удалить</span></div>
            </div>
        </Card.Header>
        <Card.Body>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-2">
                    <img style={{ cursor: "pointer" }} onClick={_openImg} src={image.src} className="img-fluid rounded-start" alt=""/>
                </div>
                <div className="col-12 col-sm-6 col-md-7 col-lg-8 col-xl-9 col-xxl-10">
                    <div className="card-body">
                        <h5 className="card-title">{question.name}</h5>
                        <p className="card-text"> {question.description}</p>
                        <p className="card-text"><small className="text-muted">{moment(question.dateAdd, "YYYYMMDD").format('LL')}</small></p>
                        <Button className="m-1" variant="primary" onClick={_testStartNormal}>Начать тест</Button>
                        <Button className="m-1" variant="primary" onClick={_testStartGlobal}>Начать глобальный тест</Button>
                    </div>
                </div>
            </div>
        </Card.Body>
    </Card>
}

export default Question;