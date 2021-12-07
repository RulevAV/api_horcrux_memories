//Таблица ролей в модальном окне
import React, {useEffect, useState} from "react";
import {MethodsModalRole} from "./Methods/Methods";
import RowRol from "./RowRol/RowRol";

type Props = {
    UserRoles:Array<string>,
    AllRoles:Array<string>,
    RolesModal:Array<string>,
    setRolesModal:(value:Array<string>)=>void
}

const ContentModal : React.FC<Props> = ({UserRoles,AllRoles,RolesModal,setRolesModal})=>{

    let [RolMenu,SetRolMenu] = useState<Array<string>>([]);
    useEffect(()=>{
        MethodsModalRole.balance(UserRoles,AllRoles,SetRolMenu,setRolesModal)
    }, [UserRoles])
    const DeleteRole = (name:string)=>{
        MethodsModalRole.DeleteRole(name,RolesModal,AllRoles,SetRolMenu,setRolesModal);
    }



    let AllRolesUI = RolMenu?.map((u,i)=>{
        return  <li  key={i} onClick={()=>{MethodsModalRole.AddRole(u,RolesModal,AllRoles,SetRolMenu,setRolesModal)}}><a className="dropdown-item" href="#">{u}</a></li>
    });
    let RolesModalUI = RolesModal?.map((name:string, index:number)=>{
        return <RowRol key={index} name={name} index={index} DeleteRole={DeleteRole}/>
    });

    return   <table className="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Роли</th>
            <td>Удалить</td>
        </tr>
        </thead>
        <tbody>
        {RolesModalUI}
        <tr>
            <td colSpan={3}  align={"left"}>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button"
                            id="dropdownMenuButton1" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        Добавить роль
                    </button>
                    <ul id={"AllRolesUI"} className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {AllRolesUI}
                    </ul>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
}

export default ContentModal;