import React from "react";


export type UserType = {
    id: number,
    email:string,
    firstName:string,
    userName:string,
    roles: Array<string>,
    setModalContent : (index:number,roles:Array<string>)=>void;
    getButtonShow : (name:string,callback:()=>void) =>React.Component
}

type PropsType = {
    user: UserType,
    index: number,
    idModal: string,
    SetIdUser: (index:number,roles:Array<string>) => void
}

const RowTable : React.FC<PropsType> = ({user,index,idModal,SetIdUser})=>{

    let callbeck = ()=>{
        SetIdUser(index,user.roles);
    }
    let btn = <div onClick={callbeck} className={""} data-bs-toggle="modal" data-bs-target={"#"+ idModal}>
        <span className={"link-primary"}>{"Открыть"}</span>
    </div>

    return <tr key={user.id}>
        <td >{index+1}</td>
        <td >{user.email}</td>
        <td >{user.firstName}</td>
        <td >{user.userName}</td>
        <td >{user.email}</td>
        <td >{btn}</td>
    </tr>
}

export  default  RowTable;
