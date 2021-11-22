import React from "react";
import RowTable from "./RowTable";
import {UserType} from "../../../redux/Admin-Reducer";
type PropsType = {
    Users:Array<UserType>,
    idModal:string,
    SetIdUser:(asd:number|null)=>void
}
const TableUsers :React.FC<PropsType> = ({Users,idModal,SetIdUser})=>{
    let massRow = Users?.map((u:UserType,index:number)=>{

        return <RowTable key={index}
                         user={u}
                         index={index}
                         idModal={idModal}
                         SetIdUser={SetIdUser}
        />
    });
    return  <table className="table table-bordered">
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
