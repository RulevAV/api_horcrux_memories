import img from "../../../img/2T5qG95FFcs.jpg";

const Question = (props) =>{

    let image=new Image();
    image.src = img;
    if(props.images){
        image = new Image();
        image.src = 'data:image/png;base64,' + props.images;
    }

    return <div key={props.id} className="row bg-secondary m-1 p-1 Question">
        <div className="col-sm-2 Question_img">
            <a asp-area="" asp-controller="Home" asp-action="Index" asp-route-IdParent="@question.Id">
                <img src={image.src}/>
            </a>
        </div>
        <div className="col-sm-10 Question_Ask">
            <h3 className="text-white text-break">{props.name}</h3>
            <div className="text-white ckeditor" >
                <div dangerouslySetInnerHTML={{__html: props.description}}/>
            </div>
            <div className="row flex-row-reverse Question_Ask-buy">
                <a className="m-1 col-xs-12 col-lg-2 btn btn-light" onClick={()=>{props.GetQuests(props.id)}}>Открыть</a>
                <a className="m-1 col-xs-12 col-lg-2 btn btn-primary" asp-route-IdParent="@question.Id" asp-route-NameTest="Global">Начать тест</a>
                <a className="m-1 col-xs-12 col-lg-4 btn btn-primary"asp-route-IdParent="@question.Id" asp-route-NameTest="Normal">Начать подробный
                    тест</a>
            </div>
        </div>
    </div>
}

export default Question;