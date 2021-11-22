import React, {useEffect, useState} from "react";
import RoleUser from "./RoleUser";

type PropsType = {
    SetSelectRoles:(asd:Array<string>)=>void,
    SelectRoles:Array<string>,
    UserRoles:Array<string>,
    AllRoles:Array<string>,
    IdUser : number|null

}
//balance - Убирает дубликаты
//В меню выбора не предлагают ролей которые уже есть
export const balance = (_userRole:Array<string>,_AllRoles:Array<string>,Setdropdown:(value:Array<string>)=>void,SetSelectRoles:(value:Array<string>)=>void)=>{

    let drop= !!_userRole?_AllRoles.filter( ( el:string ) => !_userRole.includes( el ) )
        :_AllRoles;
    Setdropdown(drop);
    SetSelectRoles(_userRole);

}

//Добавить роль пользователю
export const AddRole = (name:string,SelectRoles:Array<string>,AllRoles:Array<string>,Setdropdown:(value:Array<string>)=>void,SetSelectRoles:(value:Array<string>)=>void)=>{
    let massRole = !!name?[]:[name];//
    let Roles = SelectRoles ? [...SelectRoles,name]: massRole
    balance(Roles,AllRoles,Setdropdown,SetSelectRoles);

}
//Удалить роль у пользователя
export let DeleteRole = (name:string,SelectRoles:Array<string>,AllRoles:Array<string>,Setdropdown:(value:Array<string>)=>void,SetSelectRoles:(value:Array<string>)=>void)=>{
    let mass = SelectRoles.filter((u:string)=> u!==name);
    balance(mass,AllRoles,Setdropdown,SetSelectRoles);
}


//Таблица ролей в модальном окне
const UserRolesComp : React.FC<PropsType> = ({UserRoles,IdUser,SelectRoles,SetSelectRoles,AllRoles})=>{
    let [dropdown,Setdropdown] = useState<string[]>([]);
    useEffect(()=>{
        balance(UserRoles,AllRoles,Setdropdown,SetSelectRoles);

    },[IdUser]);
    let AllRolesUI = dropdown?.map((u,i)=>{
        return  <li key={i} onClick={()=>{AddRole(u,SelectRoles,AllRoles,Setdropdown,SetSelectRoles)}}><a className="dropdown-item" href="#">{u}</a></li>
    });
    let RolesModalUI = SelectRoles?.map((name:string, index:number)=>{
        return <RoleUser key={index} name={name} index={index} DeleteRole={()=>{DeleteRole(name,SelectRoles,AllRoles,Setdropdown,SetSelectRoles);}}/>
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

export default UserRolesComp;