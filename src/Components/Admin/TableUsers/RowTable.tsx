import React from "react";
import {UserType} from "../../../redux/Admin-Reducer";


type PropsType = {
    user: UserType,
    index: number,
    idModal: string,
    SetIdUser: (index:number,roles:Array<string>) => void
}

const RowTable : React.FC<PropsType> = ({user,index,idModal,SetIdUser})=>{
    let callback = ()=>{
        SetIdUser(index,user.roles);
    }
    let btn = <div onClick={callback} className={""} data-bs-toggle="modal" data-bs-target={"#"+ idModal}>
        <span className={"link-primary"}>{"Открыть"}</span>
    </div>

    return <tr key={user.id}>
        <td id={"index"} >{index+1}</td>
        <td id={"email"}>{user.email}</td>
        <td id={"lastName"}>{user.lastName}</td>
        <td id={"firstName"}>{user.firstName}</td>
        <td id={"userName"}>{user.userName}</td>
        <td id={"roles"}>{user.roles.join('\n')}</td>
        <td id={"btn"}>{btn}</td>
    </tr>
}


export  default  RowTable;
