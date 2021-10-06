import React, {useEffect, useState} from "react";

const ModalContent = (props) =>{

    let [userRole,SetUserRole] = useState([]);
    let [AllRoles,SetAllRoles] = useState([]);
    let balance = (_userRole,_AllRoles)=>{
        let AllRoles = _userRole ? _AllRoles.filter( ( el ) => !_userRole.includes( el ) )
            :_AllRoles;
        SetUserRole(_userRole);
        SetAllRoles(AllRoles);
    }

    useEffect(()=>{
        balance(props.RolesModal,props.AllRoles);
    },[props.RolesModal])

    let AddRole = (name)=>{
        let mass = userRole ? [name,...userRole]: [name]
        balance(mass,props.AllRoles);
    }
    let DeleteRole = (name)=>{
        let mass = userRole.filter(u=> u!==name);
        balance(mass,props.AllRoles);
    }
    let AllRolesUI = AllRoles?.map((u,i)=>{
        return  <li key={i} onClick={()=>{AddRole(u)}}><a className="dropdown-item" href="#">{u}</a></li>
    });
    let RolesModalUI = userRole?.map((u, index)=>{
        return <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{u}</td>

            <td>
                <button type="button" onClick={()=>{DeleteRole(u)}} className="btn btn-outline-danger">
                    <i className="bi bi-trash"></i>
                    Button
                </button></td>
        </tr>
    });


    return    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{props.Email}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <table className="table">
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
                            <th scope="row">+</th>
                            <td>
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
                            <td></td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button onClick={()=>{
                        props.SetUserRoles(props.Email,userRole);
                    }} type="button" className="btn btn-primary" data-bs-dismiss="modal">Сохранить</button>
                </div>
            </div>
        </div>
    </div>



}

export  default ModalContent;