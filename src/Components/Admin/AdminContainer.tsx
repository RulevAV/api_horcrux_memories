import Admin from "./Admin";
import { useEffect, useState } from "react";
import { UserType } from "../../api/API_AuthServer_Type";
import { getUsersApi } from "../../http/endpoints/user";
import { ModalAdminProvider } from "./ModalAdminContainer/modal-admin";

export const AdminContainer = () => {
    const [allRoles, setAllRoles] = useState<Array<string>>([]);
    const [users, setusers] = useState<Array<UserType>>([]);

    useEffect(() => {
        (async () => {
            const { users, allRoles } = await getUsersApi();
            setusers(users);
            setAllRoles(allRoles);
        })();
    }, []);

    return <ModalAdminProvider>
        <Admin users={users} allRoles={allRoles}/>
    </ModalAdminProvider>
}
