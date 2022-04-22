import { Cracker } from "../../redux/QuestionPage/types";

type propsType = {
    breadcrumb: Array<Cracker>
    directPage:(cracker: Cracker) => void
}

const Breadcrumb: React.FC<propsType> = ({ breadcrumb , directPage }) => {
    let items = breadcrumb.map((e, i: number) => {
        let lastItems = breadcrumb.length - 1 === i;
        if (!lastItems)
           return <li key={i} className="breadcrumb-item"><a onClick={() => {directPage(e)  }} className={"text-warning"} href="#">{e.name}</a></li>
        else
            return <li key={i} className="breadcrumb-item active" aria-current="page">{e.name}</li>
    })
    return <>
        <nav className={"m-3 fs-3"} aria-label="breadcrumb ">
            <ol className="breadcrumb">
                {items}
            </ol>
        </nav>
    </>
}

export default Breadcrumb;
