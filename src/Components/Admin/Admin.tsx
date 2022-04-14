import React, { useState } from 'react'
import TableUsers from "./TableUsers/TableUsers";
import { UserType } from "../../api/API_AuthServer_Type";
import { useModalWindow } from '../../providers/ModalWindow/modal';
import ContentModal from './ContentModal/ContentModal';
import { putRolsApi } from '../../http/endpoints/user';

type PropsType = {
    users: Array<UserType>,
    setUser:(email: string, roles: string[])=>void,
    allRoles:string[]
}

const Admin: React.FC<PropsType> = ({ users,setUser,allRoles }) => {
    const {show,setData} = useModalWindow();
   
    const handleShow = (user:UserType)=>{
        const roles = user.roles || [];
        show({
            onApply:(value)=>{
                try {
                    putRolsApi(user.email,value);
                    setUser(user.email,value);
                } catch (error) {
                    
                }
                

            },
            email:user.email,
            dialogText: <ContentModal userRoles={roles} allRoles={allRoles} setData={setData}/>
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
