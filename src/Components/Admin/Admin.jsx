import React, {useEffect, useState} from 'react'
import ModalContent from "./ModalContent";
const Admin = (props) =>{

   useEffect(()=>{
        props.GetUsers();
    },[]);

   let [Email,SetEmail] = useState("");
   let [RolesModal,SetRolesModal] = useState([]);
   let AllRoles = props.AllRoles ?? [];

   let clickRol = (Email,Roles)=>{
       let RolesTemp = Roles ? Roles.map(u=>u):[];
       SetEmail(Email);
       SetRolesModal(RolesTemp);
    };

   let massRow = props.Users.map((u,index)=>{
        let rolesUI = u.roles?.map((r,ri)=>{
            return    <div key={ri} className={"link-primary"}>{r}</div>
        });
        return <tr key={u.id}>
            <th scope="col">{index+1}</th>
            <th scope="col">{u.email}</th>
            <th scope="col">{u.firstName}</th>
            <th scope="col">{u.userName}</th>
            <th scope="col">{u.email}</th>
            <th scope="col">
                <div type="button" onClick={()=>{clickRol(u.email,u.roles)}} className="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    {
                        u.roles ===null || (u.roles?.length===0) ? <span className={"link-success"}>Добавить роль</span>
                            : rolesUI
                    }
                </div>
            </th>
        </tr>
    });


   return <div align="center ">
                <h1>Admin</h1>
       <div className={"table-responsive"}>
           <table className="table table-bordered">
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
       </div>

            <ModalContent Email={Email} RolesModal={RolesModal} AllRoles={AllRoles} SetUserRoles={props.SetUserRoles} />
          </div>
}




export default Admin;
