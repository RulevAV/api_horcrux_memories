import axios from "axios";
import Cookies from 'js-cookie'
import {AllRefreshTokenUsers, AuthType, GetUserType, RevokeTokenType} from "./API_AuthServer_Type";


//const ServerAuth = "https://maagserver/AuthServer/";
const ServerAuth = "https://localhost:44397/";

const AuthGuery = axios.create({
    withCredentials : true,
    baseURL : ServerAuth,
    headers : {
        'Content-Type': "application/json;charset=utf-8"
    }
});

export const setCookies = (data:AuthType|null)=>{
    let Token = data?.token;
    let RefreshToken = data?.refreshToken;

    if(data)
    {
        if(Token)
            Cookies.set("Token",data.token);

        if(RefreshToken)
        {
            let date = new Date( Date.parse(data.refreshTokenExpiration) );
            Cookies.set("RefreshToken",data.refreshToken,{expires:date });
        }

        let date = new Date( Date.parse(data.refreshTokenExpiration) );
        Cookies.set("Auth",JSON.stringify(data),{expires:date });
    }
}

export const deleteCookies = ()=>{
    Cookies.remove("Token");
    Cookies.remove("RefreshToken");
    Cookies.remove("Auth");
}

//token,refreshToken,refreshTokenExpiration
export const AuthAPI = {
    Token : (Email:string,Password:string) => {
        let data = JSON.stringify({Email,Password});
        return AuthGuery.post<AuthType>('api/user/token',data)
            .then(response =>{
                setCookies(response.data)
                return response;
            })
    },
    RefreshToken : ()=>{
        let RefreshToken=Cookies.get("RefreshToken");
        let data = JSON.stringify({RefreshToken});
        return  AuthGuery.post<AuthType>("api/user/refresh-token",data).then(response =>{
            setCookies(response.data);
            return response;
        })
    },
    Register : (FirstName:string,LastName:string,Username:string,Email:string,Password:string) => {
        let data =  JSON.stringify({FirstName,LastName,Username,Email,Password});
        return  AuthGuery.post<string>("api/user/register",data)

    },

    IsExistsToken:()=>{
        let promise = new Promise((resolve:any,reject:any) => {
            let Token=Cookies.get("Token");
            if(!Token){
                AuthAPI.RefreshToken().then(resolve).catch(reject);
            }
            else {
                resolve();
            }
        });
        return promise;
    },


    AddDeleteRole : (Email:string,Roles:string[])=>{
        return  AuthAPI.IsExistsToken().then(req=>{
            let Token = Cookies.get("Token");
            let data =  JSON.stringify({Email,Roles});
            let config = {
                headers: {
                    'Authorization': `Bearer  ${Token}`
                },
            }
            return AuthGuery.post<string>('api/user/add-delete-roles',data,config)
        })
    },
    RevokeToken : ()=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let RefreshToken=Cookies.get("RefreshToken");
            let data =  JSON.stringify({RefreshToken})
            deleteCookies();
            return AuthGuery.post<RevokeTokenType>('api/user/revoke-token',data)
        })
    },
    getUser:()=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=Cookies.get("Token");
            let config = {
                headers: {
                    'Authorization': `Bearer  ${Token}`
                },
            }
            return AuthGuery.get<GetUserType>('api/user/GetUsers',config);
        });

    },
    UserTokens : (id:string)=>{
        let Token=Cookies.get("Token");
        let config = {
            headers: {
                'Authorization': `Bearer  ${Token}`

            },
        }
        return AuthGuery.post<Array<AllRefreshTokenUsers>>(`api/user/tokens/${id}`,null,config)
    },
}
