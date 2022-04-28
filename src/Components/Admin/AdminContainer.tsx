import { useEffect, useState } from "react";
import { deleteAskData, deleteUserData, getUsersData } from "../../http/data/user";
import { putRolsApi } from "../../http/endpoints/user";
import { UserType } from "../../http/models/api/user";
import { useModalWindow } from "../../providers/ModalWindow/modal";
import Admin from "./Admin";
import ContentModal from "./ContentModal/ContentModal";

export const AdminContainer = () => {
    const [allRoles, setAllRoles] = useState<Array<string>>([]);
    const [users, setUsers] = useState<Array<UserType>>([]);
    const { show, setData } = useModalWindow();

    const handleShow = (user: UserType) => {
        const roles = user.roles || [];
        show({
            onApply: async (value) => {
                try {
                    await putRolsApi(user.email, value);
                    setUser(user.email, value);
                } catch (error) {

                }
            },
            title: user.email,
            dialogText: <ContentModal userRoles={roles} allRoles={allRoles} setData={setData} />,
            buttons: ["Отмена", "Сохранить"]
        });
    }

    const deleteUser = (id: string, name: string) => {
        show({
            title: name,
            onApply: async () => {
                await deleteAskData(id)
                await deleteUserData(id);
                const { users, allRoles } = await getUsersData();
                setUsers(users);
                setAllRoles(allRoles);
            },
            dialogText: `Удалить ${name}?`,
            buttons: ["Отмена", "Удалить"]
        })
    }

    const setUser = (email: string, roles: string[]) => {
        const newUsers = users.map(e => {
            if (e.email === email) {
                return {
                    ...e,
                    roles
                }
            }
            return e;
        });

        setUsers(newUsers);
    }

    useEffect(() => {
        (async () => {
            const { users, allRoles } = await getUsersData();
            setUsers(users);
            setAllRoles(allRoles);
        })();
    }, []);

    return <Admin users={users} deleteUser={deleteUser} handleShow={handleShow} />
}
