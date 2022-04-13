import React, { useState } from 'react'
import TableUsers from "./TableUsers/TableUsers";
import { UserType } from "../../api/API_AuthServer_Type";
import { useModalAdmin } from './ModalAdminContainer/modal-admin';
import ContentModal from './ModalAdminContainer/ContentModal/ContentModal';

type PropsType = {
    users: Array<UserType>,
    allRoles:string[]
}

const Admin: React.FC<PropsType> = ({ users,allRoles }) => {
    const modalAdmin = useModalAdmin();

    const handleShow = (user:UserType)=>{
        modalAdmin.show({
            onApply:()=>{
            },
            email:user.email,
            dialogText: <ContentModal userRoles={user.roles} allRoles={allRoles}/>
        });
    }

    return <div>
        <h1 className={"text-success"}>Admin</h1>
        <div className={"table-responsive"}>
            <TableUsers Users={users}
                handleShow={handleShow}
            />
        </div>
    </div>
}




export default Admin;
