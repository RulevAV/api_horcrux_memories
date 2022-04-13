import React from "react";

type PropsType = {
    index: number,
    name:string,
    DeleteRole : (name:string)=>void
}
//Запись таблицы ролей
const RowRol : React.FC<PropsType> = ({index, name, DeleteRole})=>{
        return <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{name}</td>
            <td>
                <button type="button" onClick={()=>{DeleteRole(name)}} className="btn btn-outline-danger">
                    <i className="bi bi-trash"></i>
                </button></td>
        </tr>

}

export  default RowRol;
