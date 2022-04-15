import { AuthType } from "../../api/API_AuthServer_Type";

export type initialStateType = {
    isAuthenticated: boolean;
    userName: string;
    email: string;
    roles: string[];
    message: string;
};

//Api type
export type PromiseApiType ={
    status:number,
    data:AuthType
}

export type Register ={
    isRegister : boolean,
    LoginRegistration:string,
}



