import React from "react";
import { UserType } from "../../../http/models/api/user";
import RowTable from "./RowTable";

type PropsType = {
    Users: Array<UserType>,
    handleShow: (user: UserType) => void,
    deleteUser: (id: string, name: string) => void,
}

const TableUsers: React.FC<PropsType> = ({ Users, handleShow, deleteUser }) => {
    let massRow = Users?.map((u: UserType, index: number) => {
        return <RowTable key={index}
            user={u}
            index={index}
            handleShow={handleShow}
            deleteUser={deleteUser}
        />
    });

    return <table className="table table-sm table-bordered table-info">
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
                <th id={"delete"} scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {massRow}
        </tbody>
    </table>
}

export default TableUsers;
