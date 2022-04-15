import { useEffect, useState } from "react";
import { getUsersApi } from "../../../http/endpoints/user";
import { UserType } from "../../../http/models/api/user";
import Admin from "./Admin";

export const AdminContainer = () => {
    const [allRoles, setAllRoles] = useState<Array<string>>([]);
    const [users, setUsers] = useState<Array<UserType>>([]);

    const setUser = (email: string, roles: string[])=>{
        const newUsers = users.map(e=>{
               if(e.email===email){
                   return{
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
            const { users, allRoles } = await getUsersApi();
            setUsers(users);
            setAllRoles(allRoles);
        })();
    }, []);

    return  <Admin users={users} setUser={setUser} allRoles={allRoles}/>
}
