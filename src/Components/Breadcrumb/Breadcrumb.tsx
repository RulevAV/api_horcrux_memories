import { Cracker } from "../../redux/QuestionPage/types";

type propsType = {
  breadcrumb: Array<Cracker>
  changePage: (cracker: Cracker) => void
}

const Breadcrumb: React.FC<propsType> = ({ breadcrumb, changePage }) => {
  let items = breadcrumb.map((e, i: number) => {
    let lastItems = breadcrumb.length - 1 === i;
    if (!lastItems)
      return <li key={i} className="breadcrumb-item"><span onClick={() => { changePage(e) }} style={{ "cursor": "pointer" }} className={"text-warning"}>{e.name}</span></li>
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
