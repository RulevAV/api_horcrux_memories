import React, {useEffect, useState} from 'react'
import {UserType} from "../../redux/Admin-Reducer";
import TableUsers from "./TableUsers/TableUsers";
import {Button, Modal} from "react-bootstrap";
import ContentModal from "./ContentModal/ContentModal";


type PropsType = {
    AllRoles:Array<string>,
    GetUsers:()=>void,
    SetUserRoles:(Email:string,Roles:Array<string>)=>void,
    Users : Array<UserType>,
}
export type IdUserType = number|null;

const Admin :React.FC<PropsType> = ({AllRoles,GetUsers,SetUserRoles,Users}) =>{
    useEffect(()=>{
        GetUsers();
    },[]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [IdUser,SetIdUser] = useState<IdUserType>(null);


    let Email = IdUser!=null ? Users[IdUser]?.email :"";
    let UserRoles = IdUser!==null ? Users[IdUser]?.roles : [];

    //Роли которые нужно установить пользователю.
    let [RolesModal,setRolesModal] = useState<Array<string>>([]);
    const Save = ()=>{
        SetUserRoles(Email,RolesModal);
        handleClose();
    }

   return <div>
                <h1 className={"text-success"}>Admin</h1>
                   <div className={"table-responsive"}>
                        <TableUsers Users={Users}
                                    handleShow={handleShow}
                                    SetIdUser={SetIdUser}
                        />
                   </div>

               <Modal show={show} onHide={handleClose}>
                   <Modal.Header closeButton>
                       <Modal.Title>{Email}</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                      <ContentModal UserRoles={UserRoles} AllRoles={AllRoles} RolesModal={RolesModal} setRolesModal={setRolesModal}/>
                   </Modal.Body>
                   <Modal.Footer>
                       <Button variant="secondary" onClick={handleClose}>
                           Закрыть
                       </Button>
                       <Button variant="primary" onClick={Save}>
                           Сохранить
                       </Button>
                   </Modal.Footer>
               </Modal>
       </div>
}




export default Admin;
