import UserRolesComp from "./UserRolesComp";
import React, {useState} from "react";
type PropsType = {
    idModal:string,
    UserRoles:Array<string>,
    Email:string,
    IdUser:number|null
    AllRoles:Array<string>
    SetUserRoles:(Email:string,Roles:Array<string>)=>void
    SetIdUser:(as:null)=>void
}
const ModalContent : React.FC<PropsType> = ({SetIdUser, AllRoles, Email, idModal,UserRoles, IdUser,SetUserRoles})=>{
    let [SelectRoles,SetSelectRoles] = useState<Array<string>>([]);

    let myModalEl: HTMLElement | null = document.getElementById(idModal);
    myModalEl?.addEventListener('hidden.bs.modal', function (event) {
        SetIdUser(null);
    })

    return  <div className="modal fade" id={idModal}  aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{Email}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <UserRolesComp UserRoles={UserRoles}
                                   IdUser={IdUser}
                                   SelectRoles={SelectRoles}
                                   SetSelectRoles={SetSelectRoles}
                                   AllRoles={AllRoles}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button onClick={()=>{
                           SetUserRoles(Email,SelectRoles);
                    }} type="button" className="btn btn-primary" data-bs-dismiss="modal">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
}

export default ModalContent;

