import React, {useEffect, useState} from "react";
import RoleUser from "./RoleUser";

type PropsType = {
    SetSelectRoles:(asd:Array<string>)=>void,
    SelectRoles:Array<string>,
    UserRoles:Array<string>,
    AllRoles:Array<string>,
    IdUser : number|null

}

const UserRolesComp : React.FC<PropsType> = ({UserRoles,IdUser,SelectRoles,SetSelectRoles,AllRoles})=>{
    let [dropdown,Setdropdown] = useState<string[]>([]);
    let balance = (_userRole:Array<string>,_AllRoles:Array<string>)=>{
        let drop = _userRole ? _AllRoles.filter( ( el:string ) => !_userRole.includes( el ) )
            :_AllRoles;
        Setdropdown(drop);
        SetSelectRoles(_userRole);
    }
    useEffect(()=>{
        balance(UserRoles,AllRoles);
    },[IdUser]);




    let AddRole = (name:string)=>{
        let mass = SelectRoles ? [name,...SelectRoles]: [name]
        balance(mass,AllRoles);
    }
    let AllRolesUI = dropdown?.map((u,i)=>{
        return  <li key={i} onClick={()=>{AddRole(u)}}><a className="dropdown-item" href="#">{u}</a></li>
    });
    let DeleteRole = (name:string)=>{
        let mass = SelectRoles.filter((u:string)=> u!==name);
        balance(mass,AllRoles);
    }
    let RolesModalUI = SelectRoles?.map((name:string, index:number)=>{
        return <RoleUser key={index} name={name} index={index} DeleteRole={DeleteRole}/>
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
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                              {AllRolesUI}
                      </ul>
                  </div>
              </td>
          </tr>
        </tbody>
    </table>
}

export default UserRolesComp;