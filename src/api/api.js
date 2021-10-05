import * as axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8";

const ServerAuth = "https://maagserver/AuthServer/";
//const ServerAuth = "https://localhost:44397/";

const url_register = ServerAuth+"api/user/register";
const url_token = ServerAuth+"api/user/token";
const url_AddRole = ServerAuth+"api/user/addrole";
const url_refresh_token = ServerAuth+"api/user/refresh-token";
const url_revoke_token = ServerAuth+"api/user/revoke-token";
const url_user_tokens = ServerAuth+"api/user/tokens/";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const AuthAPI = {
    Register : (FirstName,LastName,Username,Email,Password) => {
        return  axios({
            method: 'POST',
            url:url_register,
            data: JSON.stringify({FirstName,LastName,Username,Email,Password})
        })
    },
    Token : (Email,Password) => {
        return  axios({
            method: 'POST',
            url:url_token,
            data: JSON.stringify({Email,Password})
        })
    },
    AddRole : (Email,Password,Role)=>{
        return  axios({
            method: 'POST',
            url:url_AddRole,
            data: JSON.stringify({Email,Password,Role})
        })
    },
    RefreshToken : ()=>{
        return  axios({
            method: 'POST',
            url:url_refresh_token,
        })
    },
    RevokeToken : ()=>{
       let RefreshToken=getCookie("RefreshToken");
        console.log(RefreshToken)
        return  axios({
            method: 'POST',
            url:url_revoke_token,
            data: JSON.stringify({RefreshToken})
        })
    },
    UserTokens : (Token,id)=>{
        return  axios({
            method: 'POST',
            url:url_user_tokens+id,
            headers: {
                'Authorization': 'Bearer ' + Token
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











