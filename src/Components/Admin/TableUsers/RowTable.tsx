import React from "react";

import { Button } from 'react-bootstrap';
import { UserType } from "../../../http/models/api/user";

type PropsType = {
    user: UserType,
    index: number,
    handleShow: (user: UserType) => void,
    deleteUser: (id: string, name: string) => void,
}

const RowTable: React.FC<PropsType> = ({ user, index, handleShow, deleteUser }) => {
    const callback = () => {
        handleShow(user);
    }
    const _deleteUser = () => {
        deleteUser(user.id, user.email);
    }
    return <tr key={user.id}>
        <td id={"index"} >{index + 1}</td>
        <td id={"email"}>{user.email}</td>
        <td id={"lastName"}>{user.lastName}</td>
        <td id={"firstName"}>{user.firstName}</td>
        <td id={"userName"}>{user.userName}</td>
        <td id={"roles"}>{user.roles?.join('\n')}</td>
        <td id={"btn"}>  <Button variant="primary" onClick={callback}>
            Открыть
        </Button></td>
        <td id={"delete"}>  <Button variant="danger" onClick={_deleteUser}>
            Удалить пользователя
        </Button></td>
    </tr>
}


export default RowTable;
