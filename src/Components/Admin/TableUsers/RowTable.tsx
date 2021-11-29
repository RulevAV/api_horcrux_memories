import React from "react";
import {UserType} from "../../../redux/Admin-Reducer";
import { Button } from 'react-bootstrap';
import {IdUserType} from "../Admin";

type PropsType = {
    user: UserType,
    index: number,
    SetIdUser: (value:IdUserType) => void
    handleShow:()=>void
}

const RowTable : React.FC<PropsType> = ({user,index,handleShow,SetIdUser})=>{
    let callback = ()=>{
        SetIdUser(index);
        handleShow();
    }
    return <tr key={user.id}>
        <td id={"index"} >{index+1}</td>
        <td id={"email"}>{user.email}</td>
        <td id={"lastName"}>{user.lastName}</td>
        <td id={"firstName"}>{user.firstName}</td>
        <td id={"userName"}>{user.userName}</td>
        <td id={"roles"}>{user.roles?.join('\n')}</td>
        <td id={"btn"}>  <Button variant="primary" onClick={callback}>
            Открыть
        </Button></td>
    </tr>
}


export  default  RowTable;
