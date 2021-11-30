import React from "react";
import RowTable from "./RowTable";
import {UserType} from "../../../redux/Admin-Reducer";
import {IdUserType} from "../Admin";
type PropsType = {
    Users:Array<UserType>,
    handleShow:()=>void
    SetIdUser:(value:IdUserType)=>void
}
const TableUsers :React.FC<PropsType> = ({Users,handleShow,SetIdUser})=>{
    let massRow = Users?.map((u:UserType,index:number)=>{

        return <RowTable key={index}
                         user={u}
                         index={index}
                         SetIdUser={SetIdUser}
                         handleShow={handleShow}
        />
    });
    return  <table className="table table-dark">
        <caption> Все пользователи </caption>
        <thead>
        <tr>
            <th id={"index"} scope="col">#</th>
            <th id={"email"} scope="col">FirstName</th>
            <th id={"lastName"} scope="col">LastName</th>
            <th id={"firstName"} scope="col">UserName</th>
            <th id={"userName"} scope="col">Email</th>
            <th id={"roles"} scope="col">Роли</th>
            <th id={"btn"} scope="col"></th>
        </tr>
        </thead>
        <tbody>
        {massRow}
        </tbody>
    </table>
}

export default TableUsers;
