import moment from "moment-ru";
import { QuestionsType } from "../../../http/models/api/question";
import img from "../../../img/2T5qG95FFcs.jpg";
type PropsTypeTest = {
    question: QuestionsType
    isIgnoreTest: boolean,
    setIsIgnoreTest: (value: boolean) => void,
    isHiddenContentTest: boolean,
    setisHiddenContentTest: (value: boolean) => void
}

export const Question: React.FC<PropsTypeTest> = ({ question, isIgnoreTest, setIsIgnoreTest,isHiddenContentTest,setisHiddenContentTest }) => {
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
                question.description ? <div className="card-text" dangerouslySetInnerHTML={{ __html: question.description }} /> : null
            }
            <p className="card-text"><small className="text-muted">{moment(question.dateAdd, "YYYYMMDD").format('LL')}</small></p>
        </div>
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="isIgnoreTest" onChange={() => { setIsIgnoreTest(!isIgnoreTest) }} checked={isIgnoreTest} />
            <label className="form-check-label" htmlFor="isIgnoreTest">Пропускать этот вопрос</label>
        </div>
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="isHiddenContentTest" onChange={() => { setisHiddenContentTest(!isHiddenContentTest) }} checked={isHiddenContentTest} />
            <label className="form-check-label" htmlFor="isHiddenContentTest">Скрывать описание</label>
        </div>
    </div>
}