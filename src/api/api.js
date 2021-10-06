import * as axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8";

//const ServerAuth = "https://maagserver/AuthServer/";
const ServerAuth = "https://localhost:44397/";

const url_register = ServerAuth+"api/user/register";
const url_token = ServerAuth+"api/user/token";
const url_AddDeleteRoles = ServerAuth+"api/user/add-delete-roles";
const url_refresh_token = ServerAuth+"api/user/refresh-token";
const url_revoke_token = ServerAuth+"api/user/revoke-token";
const url_user_tokens = ServerAuth+"api/user/tokens/";
const url_GetUsers = ServerAuth+"api/user/GetUsers";
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setResponseCookie(data){
    var t = new Date();
    t.setHours(t.getHours() + 10);
    let date = t.toUTCString();
    let dateToken = data.refreshTokenExpiration;
    document.cookie = `RefreshToken=${data.refreshToken}; expires=` + date;
    document.cookie = `Token=${data.token}; expires=` + dateToken;
}


export const AuthAPI = {
    Token : (Email,Password) => {
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
    Register : (FirstName,LastName,Username,Email,Password) => {
        return  AuthAPI.RefreshToken().then(req=>{
            return axios({
                method: 'POST',
                url:url_register,
                data: JSON.stringify({FirstName,LastName,Username,Email,Password})
            })
        })
    },
    AddDeleteRole : (Email,Roles)=>{
        return  AuthAPI.RefreshToken().then(req=>{
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
        return AuthAPI.RefreshToken().then(req=>{
            let RefreshToken=getCookie("RefreshToken");
            return  axios({
                method: 'POST',
                url:url_revoke_token,
                data: JSON.stringify({RefreshToken})
            })
        })
    },
    GetUser:()=>{
        return AuthAPI.RefreshToken().then(req=>{
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
    UserTokens : (Token,id)=>{
        return  axios({
            method: 'POST',
            url:url_user_tokens+id,
            headers: {
                'Authorization': `Bearer  ${Token}`,
            }
        })
    },
}

const url_Secured = "https://localhost:44370/api/Values";
export const DataAPI = {
    Secured : ()=>{
        return  axios({
            method: 'POST',
            url:url_Secured,
        })
    },
}











