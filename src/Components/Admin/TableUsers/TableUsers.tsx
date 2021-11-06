import React from "react";
import RowTable, {UserType} from "./RowTable";

type PropsType = {
    Users:Array<UserType>,
    idModal:string,
    SetIdUser:(asd:number|null)=>void
}
const TableUsers :React.FC<PropsType> = ({Users,idModal,SetIdUser})=>{
    let massRow = Users.map((u:UserType,index:number)=>{

        return <RowTable user={u}
                         index={index}
                         idModal={idModal}
                         SetIdUser={SetIdUser}
        />
    });
    return  <table className="table table-bordered">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Роли</th>
        </tr>
        </thead>
        <tbody>
        {massRow}
        </tbody>
    </table>
}

export default TableUsers;