import axios, {AxiosResponse} from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8";

const ServerAuth = "https://maagserver/AuthServer/";
//const ServerAuth = "https://localhost:44397/";

const ServerHorcruxMemories = "https://maagserver/API_HorcruxMemories/";
//const ServerHorcruxMemories = "https://localhost:44370/";
const AuthGuery = axios.create({
    withCredentials : true,
    baseURL : ServerAuth,
    headers : {
        'Content-Type': "application/json;charset=utf-8"
    }
});
const DataGuery = axios.create({
    withCredentials : true,
    baseURL : ServerHorcruxMemories,
    headers : {
        'Content-Type': "application/json;charset=utf-8"
    }
})

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

enum ResultCodesEnum {
    Success=0,
    Error = 1,
}



export const AuthAPI = {
    Token : (Email:string,Password:string) => {
        let data = JSON.stringify({Email,Password});
        return AuthGuery.post<ResponseTokenType>('api/user/token',data)
            .then(response =>{
                setResponseCookie(response.data)
                return response;
            })
    },
    RefreshToken : ()=>{
        let RefreshToken=getCookie("RefreshToken");
        let data = JSON.stringify({RefreshToken});
        return  AuthGuery.post<ResponseTokenType>("api/user/refresh-token",data).then(response =>{
            setResponseCookie(response.data)
            return response;
        })
    },
    Register : (FirstName:string,LastName:string,Username:string,Email:string,Password:string) => {
        let data =  JSON.stringify({FirstName,LastName,Username,Email,Password});
        return  AuthGuery.post("api/user/register",data)

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
            let Token = getCookie("Token");
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
            let RefreshToken=getCookie("RefreshToken");
            let data =  JSON.stringify({RefreshToken})
            return AuthGuery.post('api/user/revoke-token',data)
        })
    },
    GetUser:()=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=getCookie("Token");
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

export const DataAPI = {
    Portions : (IdParent?:string, Page?:number, PortionsSize?:number )=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=getCookie("Token");
            let config = {
                headers: {
                    'Authorization': `Bearer  ${Token}`
                },
                params: {IdParent, Page, PortionsSize}
            }
            return DataGuery.get('api/Question/Portions/',config)
        });

    },
    TestStart : (IdRoot:string,nameTest:string)=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=getCookie("Token");
            let config = {
                headers: {
                    'Authorization': `Bearer  ${Token}`
                },
                params: {IdRoot,Type:nameTest}
            }
            return DataGuery.get('api/Test/',config)
        });
    },
    TestNext : (IdRoot:string,TestHistory:string[],id:string,isIgnoreTest:boolean,nameTest:string)=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=getCookie("Token");
            let data= JSON.stringify({IdRoot,TestHistory,id,isIgnoreTest})
            let config = {
                headers: {
                    'Authorization': `Bearer  ${Token}`
                },
                params:{Type:nameTest},

            }
            return DataGuery.post('api/Test/',data,config);
        });
    },

}