import React from 'react'
import TableUsers from "./TableUsers/TableUsers";
import { UserType } from '../../http/models/api/user';

type PropsType = {
    users: Array<UserType>,
    deleteUser: (id: string, name: string) => void,
    handleShow: (user: UserType) => void
}

const Admin: React.FC<PropsType> = ({ users, handleShow, deleteUser }) => {

    return <div>
        <h1 className={"text-success"}>Администратор</h1>
        <div className={"table-responsive"}>
            <TableUsers Users={users}
                handleShow={handleShow}
                deleteUser={deleteUser}
            />
        </div>
    </div>
}

export default Admin;
