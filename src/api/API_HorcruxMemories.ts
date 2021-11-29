import axios from "axios";
import {AuthAPI} from "./API_AuthServer";
import Cookies from "js-cookie";
const ServerHorcruxMemories = "https://maagserver/API_HorcruxMemories/";
//const ServerHorcruxMemories = "https://localhost:44370/";
const DataGuery = axios.create({
    withCredentials : true,
    baseURL : ServerHorcruxMemories,
    headers : {
        'Content-Type': "application/json;charset=utf-8"
    }
})

export const DataAPI = {
    Portions : (IdParent?:string, Page?:number, PortionsSize?:number )=>{
        return AuthAPI.IsExistsToken().then(req=>{
            let Token=Cookies.get("Token");
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
            let Token=Cookies.get("Token");
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
            let Token=Cookies.get("Token");
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