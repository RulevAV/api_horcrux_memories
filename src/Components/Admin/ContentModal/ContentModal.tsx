//Таблица ролей в модальном окне
import React, { useEffect, useState } from "react";
import RowRol from "./RowRol/RowRol";

type Props = {
    userRoles: string[],
    allRoles: string[],
    setData: (data: any) => void
}

const ContentModal: React.FC<Props> = ({ userRoles, allRoles, setData }) => {
    const [roles, setRoles] = useState<string[]>([]);
    const [newUserRoles, setNewUserRoles] = useState<string[]>([]);

    const updateRoles = (userRoles: string[]) => {
        const roles = allRoles.filter((e) => {
            return !userRoles.includes(e);
        });

        setRoles(roles);
    }

    const deleteRole = (name: string) => {
        const _newUserRoles = newUserRoles.filter((e) => {
            return e !== name;
        });
        setNewUserRoles(_newUserRoles);
    }

    useEffect(() => {
        setNewUserRoles(userRoles);
    }, [userRoles])

    useEffect(() => {
        setData(newUserRoles);
        updateRoles(newUserRoles);
    }, [newUserRoles])

    return <table className="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Роли</th>
                <td>Удалить</td>
            </tr>
        </thead>
        <tbody>
            {newUserRoles?.map((name: string, index: number) => {
                return <RowRol key={index} name={name} index={index} deleteRole={deleteRole} />
            })}
            <tr>
                <td colSpan={3} align={"left"}>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button"
                            id="dropdownMenuButton1" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Добавить роль
                        </button>
                        <ul id={"AllRolesUI"} className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {roles?.map((u, i) => {
                                return <li key={i} onClick={() => { setNewUserRoles([...newUserRoles, u]) }} ><a className="dropdown-item" href="#">{u}</a></li>
                            })}
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
}

export default ContentModal;