import axios from "axios";
import Cookies from 'js-cookie'


/*
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8";
*/

const ServerAuth = "https://maagserver/AuthServer/";
//const ServerAuth = "https://localhost:44397/";

const AuthGuery = axios.create({
    withCredentials : true,
    baseURL : ServerAuth,
    headers : {
        'Content-Type': "application/json;charset=utf-8"
    }
});

type ResponseTokenType = {
    email: string
    isAuthenticated: boolean
    message: string|null
    refreshToken: string
    refreshTokenExpiration: string
    roles: string[]
    token: string
    userName: string
}

type TokenUserType={
    email: string
    isAuthenticated: boolean
    message: null|string
    refreshToken: string
    refreshTokenExpiration: string
    roles: Array<string>
    token: string
    userName:string
}

export const setCookies = (data:TokenUserType)=>{
    let Token = data?.token;
    let RefreshToken = data?.refreshToken;
    if(Token)
    {
        Cookies.set("Token",data.token);
    }
    if(RefreshToken)
    {
        let date = new Date( Date.parse(data.refreshTokenExpiration) );
        Cookies.set("RefreshToken",data.refreshToken,{expires:date });
    }
    if(data)
    {
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
        return AuthGuery.post<ResponseTokenType>('api/user/token',data)
            .then(response =>{
                setCookies(response.data)
                return response;
            })
    },
    RefreshToken : ()=>{
        let RefreshToken=Cookies.get("RefreshToken");
        let data = JSON.stringify({RefreshToken});
        return  AuthGuery.post<ResponseTokenType>("api/user/refresh-token",data).then(response =>{
           setCookies(response.data);
            return response;
        })
    },
    Register : (FirstName:string,LastName:string,Username:string,Email:string,Password:string) => {
        let data =  JSON.stringify({FirstName,LastName,Username,Email,Password});
        return  AuthGuery.post("api/user/register",data)

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
            return AuthGuery.post('api/user/add-delete-roles',data,config)
        })
    },
    RevokeToken : ()=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let RefreshToken=Cookies.get("RefreshToken");
            let data =  JSON.stringify({RefreshToken})
            deleteCookies();
            return AuthGuery.post('api/user/revoke-token',data).then()
        })
    },
    GetUser:()=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=Cookies.get("Token");
            let config = {
                headers: {
                    'Authorization': `Bearer  ${Token}`
                },
            }
            return AuthGuery.post('api/user/GetUsers',null,config)
        });

    },
    UserTokens : (Token:string,id:string)=>{
        let config = {
            headers: {
                'Authorization': `Bearer  ${Token}`
            },
        }
        return AuthGuery.post('api/user/tokens/',null,config)
    },
}
