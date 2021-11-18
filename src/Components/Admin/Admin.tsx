import React, {useEffect, useState} from 'react'
import TableUsers from "./TableUsers/TableUsers";
import ModalContent from "./UseModel/ModalContent";
import {UserType} from "../../redux/Admin-Reducer";


type PropsType = {
    AllRoles:Array<string>,
    GetUsers:()=>void,
    SetUserRoles:(Email:string,Roles:Array<string>)=>void,
    Users : Array<UserType>,
}

const Admin :React.FC<PropsType> = ({AllRoles,GetUsers,SetUserRoles,Users}) =>{
   useEffect(()=>{
        GetUsers();
    },[]);
    let [IdUser,SetIdUser] = useState<number|null>(null);

    let Email = IdUser!=null ? Users[IdUser]?.email :"";
    let UserRoles = IdUser!==null ? Users[IdUser]?.roles : [];
   return <div>
                <h1>Admin</h1>
       <div className={"table-responsive"}>
            <TableUsers Users={Users}
                        idModal={"User"}
                        SetIdUser={SetIdUser}
            />
       </div>
       <ModalContent SetIdUser={SetIdUser} AllRoles={AllRoles} Email={Email} idModal={"User"} UserRoles={UserRoles} IdUser={IdUser} SetUserRoles={SetUserRoles}/>
   </div>
}




export default Admin;
