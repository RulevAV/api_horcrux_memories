import React from "react";

type PropsType = {
    index: number,
    name:string,
    deleteRole : (name:string)=>void
}

const RowRol : React.FC<PropsType> = ({index, name, deleteRole})=>{
        return <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{name}</td>
            <td>
                <button type="button" onClick={()=>{deleteRole(name)}} className="btn btn-outline-danger">
                    <i className="bi bi-trash"></i>
                </button></td>
        </tr>
}

export  default RowRol;
