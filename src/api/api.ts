import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8";

const ServerAuth = "https://maagserver/AuthServer/";
//const ServerAuth = "https://localhost:44397/";

//const ServerHorcruxMemories = "https://localhost:44370/";
const ServerHorcruxMemories = "https://maagserver/API_HorcruxMemories/";


const url_register = ServerAuth+"api/user/register";
const url_token = ServerAuth+"api/user/token";
const url_AddDeleteRoles = ServerAuth+"api/user/add-delete-roles";
const url_refresh_token = ServerAuth+"api/user/refresh-token";
const url_revoke_token = ServerAuth+"api/user/revoke-token";
const url_user_tokens = ServerAuth+"api/user/tokens/";
const url_GetUsers = ServerAuth+"api/user/GetUsers";
function getCookie(name:string) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setResponseCookie(data :any){

    console.log(data)
    let dateToken = data.refreshTokenExpiration;
    document.cookie = `RefreshToken=${data.refreshToken}; expires=true`;
    document.cookie = `Token=${data.token}; expires=` + dateToken;
}

export const AuthAPI = {
    Token : (Email:string,Password:string) => {
        return  axios({
            method: 'POST',
            url:url_token,
            data: JSON.stringify({Email,Password})
        }).then(response =>{
            //let date = new Date(Date.now() + 86400e3).toUTCString();
            setResponseCookie(response.data)
                return response;
        })
    },
    Register : (FirstName:string,LastName:string,Username:string,Email:string,Password:string) => {
        return axios({
            method: 'POST',
            url:url_register,
            data: JSON.stringify({FirstName,LastName,Username,Email,Password})
        })
    },
    RefreshToken : ()=>{
        let RefreshToken=getCookie("RefreshToken");
        return  axios({
            method: 'POST',
            url:url_refresh_token,
            data: JSON.stringify({RefreshToken})
        }).then(response =>{
            setResponseCookie(response.data)
            return response;
        })
    },
    IsExistsToken:()=>{
        let promise = new Promise((resolve:any,reject) => {
            let Token=getCookie("Token");
            if(!Token)
                AuthAPI.RefreshToken().then(resolve());
            else
            resolve();
        });
        return promise;
    },

    AddDeleteRole : (Email:string,Roles:string[])=>{
        return  AuthAPI.IsExistsToken().then(req=>{
            let Token=getCookie("Token");
            return  axios({
                method: 'POST',
                url:url_AddDeleteRoles,
                headers: {
                    'Authorization': `Bearer  ${Token}`
                },
                data: JSON.stringify({Email,Roles})
            })
        })
    },
    RevokeToken : ()=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let RefreshToken=getCookie("RefreshToken");
            return  axios({
                method: 'POST',
                url:url_revoke_token,
                data: JSON.stringify({RefreshToken})
            })
        })
    },
    GetUser:()=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=getCookie("Token");
            return  axios({
                method: 'POST',
                headers: {
                    'Authorization': `Bearer  ${Token}`,
                },
                url:url_GetUsers,
            })
        });

    },
    UserTokens : (Token:string,id:string)=>{
        return  axios({
            method: 'POST',
            url:url_user_tokens+id,
            headers: {
                'Authorization': `Bearer  ${Token}`,
            }
        })
    },
}

const url_Question_Portions = ServerHorcruxMemories+"api/Question/Portions/";
const url_Question_Test = ServerHorcruxMemories+"api/Test/";
export const DataAPI = {
    Portions : (IdParent?:string, Page?:number, PortionsSize?:number )=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=getCookie("Token");
            return  axios({
                method: 'GET',
                url:url_Question_Portions,
                headers: {
                    'Authorization': `Bearer  ${Token}`,
                },
                params: {IdParent, Page, PortionsSize}
            })
        });

    },
    TestStart : (IdRoot:string,nameTest:string)=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=getCookie("Token");
            return  axios({
                method: 'GET',
                url:url_Question_Test,
                headers: {
                    'Authorization': `Bearer  ${Token}`,
                },
                params: {IdRoot,Type:nameTest}
            })
        });
    },
    TestNext : (IdRoot:string,TestHistory:string[],id:string,isIgnoreTest:boolean,nameTest:string)=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=getCookie("Token");


            return  axios({
                method: 'POST',
                url:url_Question_Test,
                headers: {
                    'Authorization': `Bearer  ${Token}`,
                },
                params:{Type:nameTest},
                data: JSON.stringify({IdRoot,TestHistory,id,isIgnoreTest})
            })
        });
    },

}











