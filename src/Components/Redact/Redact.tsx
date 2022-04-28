import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionsType } from "../../http/models/api/question";
import img from "../../img/2T5qG95FFcs.jpg";
import { initial } from "./initial-values";
type Props = {
    openImg: (src: string) => void,
    redactReducer?: QuestionsType,
    save: (model: QuestionsType) => void

};

const Redact: React.FC<Props> = ({ openImg, redactReducer, save }) => {
    const [ask, setAsk] = useState<QuestionsType>(redactReducer ?? initial);
    const ref = useRef<HTMLInputElement>(null)
    let image = new Image();
    image.src = img;
    if (ask.images) {
        image = new Image();
        image.src = 'data:image/png;base64,' + ask.images;
    }
    const changeName = (e: any) => {
        setAsk({
            ...ask,
            name: e.target.value
        })
    }

    const changeDescription = (e: any) => {
        setAsk({
            ...ask,
            description: e.target.value
        })
    }

    const changeIsIgnoreTest = (e: any) => {
        setAsk({
            ...ask,
            isIgnoreTest: !ask.isIgnoreTest
        })
    }

    const changeIsHiddenContentTest = (e: any) => {
        setAsk({
            ...ask,
            isHiddenContentTest: !ask.isHiddenContentTest
        })
    }

    const changeImg = (e: any) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        let base64text: string | ArrayBuffer | null = "";
        reader.onloadend = function () {
            base64text = reader.result as string;
            const mass = base64text.split(',');
            setAsk({
                ...ask,
                images: mass[1]
            })
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    const _save = () => {
        save(ask);
    }
    return <div>
        <h1>Редактирование</h1>
        <div className="row">
            <div className="col-lg-6">
                <img className="card-img-top" onClick={() => { openImg(image.src) }} src={image.src} alt=""/>
                <Button onClick={()=>{ref.current?.click()}} variant="success">Добавить изображение</Button>{' '}
                <input ref={ref} hidden name="myFile" type="file" onChange={changeImg}></input>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="isIgnoreTest" onChange={changeIsIgnoreTest} checked={ask.isIgnoreTest} />
                    <label className="form-check-label" htmlFor="isIgnoreTest" >Пропускать этот вопрос</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="isHiddenContentTest" onChange={changeIsHiddenContentTest} checked={ask.isHiddenContentTest} />
                    <label className="form-check-label" htmlFor="isHiddenContentTest" >Скрывать описание</label>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="row">
                    <div className="col-12">
                        <label>Название
                            <input className="m-1" type="text" value={ask.name} onChange={changeName} />
                        </label>
                    </div>
                </div>
                <div className="row">
                    <label>Описание
                        <textarea className="w-100  adaptiv-textarea" value={ask.description} onChange={changeDescription} />
                    </label>
                </div>
            </div>

            <div className="d-flex flex-row-reverse bd-highlight">
                <Button variant="success" onClick={_save}>Сохранить</Button>{' '}
            </div>


        </div>
    </div>
}

export default Redact;