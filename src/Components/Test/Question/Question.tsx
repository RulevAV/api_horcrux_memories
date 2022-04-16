import moment from "moment-ru";
import { QuestionsType } from "../../../http/models/api/question";
import img from "../../../img/2T5qG95FFcs.jpg";
type PropsTypeTest = {
    question: QuestionsType
}

export const Question: React.FC<PropsTypeTest> = ({ question }) => {
    let image = new Image();
    image.src = img;
    if (question.images) {
        image = new Image();
        image.src = 'data:image/png;base64,' + question.images;
    }
    return <div className="card mb-3">
        <img src={image.src} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{question.name}</h5>
            {
                 question.description?<div  className="card-text" dangerouslySetInnerHTML={{ __html: question.description }}/>:null
            }
            <p className="card-text"><small className="text-muted">{moment(question.dateAdd, "YYYYMMDD").format('LL')}</small></p>
        </div>
    </div>
}