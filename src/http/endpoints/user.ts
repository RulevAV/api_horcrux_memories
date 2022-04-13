import { GetUserType, LoginApi } from "../models/api/user";
import { httpService } from "../service";
import { HttpOptions } from "../service/options"

export const getUser = ()=>{
    const options = new HttpOptions();
    return httpService.get<LoginApi>(`/user/GetUser`,options);
}

export const loginApi = (email:string,password:string)=>{
    const options = new HttpOptions().withCredentials(true);
    return httpService.post<LoginApi>(`/user/token`,{email,password},options);
}

export const revokeTokenApi = ()=>{
    const options = new HttpOptions().withCredentials(true);
    return httpService.get<LoginApi>(`/user/revoke-token`,options);
}

export const getUsersApi = ()=>{
    const options = new HttpOptions().withCredentials(true);
    return httpService.get<GetUserType>(`/user/GetUsers`,options);
}
