import axios from "axios";
import {AuthAPI} from "./API_AuthServer";
import Cookies from "js-cookie";
//import {AskType, DependOnParentQuestionType} from "./API_HorcruxMemories_Type";

//const ServerHorcruxMemories = "https://maagserver/API_HorcruxMemories/";
const ServerHorcruxMemories = "https://localhost:44370/";


const DataGuery = axios.create({
    withCredentials : true,
    baseURL : ServerHorcruxMemories,
    headers : {
        'Content-Type': "application/json;charset=utf-8"
    }
})

export const DataAPI = {
    // Portions : (IdParent?:string, Page?:number, PortionsSize?:number )=>{
    //     return AuthAPI.IsExistsToken().then(req=>{
    //         let Token=Cookies.get("Token");
    //         let config = {
    //             headers: {
    //                 'Authorization': `Bearer  ${Token}`
    //             },
    //             params: {IdParent, Page, PortionsSize}
    //         }
    //         return DataGuery.get<DependOnParentQuestionType>('api/Question/Portions/',config)
    //     });

    // },
    // TestStart : (IdRoot:string,nameTest:string)=>{
    //     return AuthAPI.IsExistsToken().then(req=>{
    //         let Token=Cookies.get("Token");
    //         let config = {
    //             headers: {
    //                 'Authorization': `Bearer  ${Token}`
    //             },
    //             params: {IdRoot,Type:nameTest}
    //         }
    //         return DataGuery.get<AskType>('api/Test/',config)
    //     });
    // },
    // TestNext : (IdRoot:string,TestHistory:string[],id:string,isIgnoreTest:boolean,nameTest:string)=>{
    //     return AuthAPI.IsExistsToken().then(req=>{
    //         let Token=Cookies.get("Token");
    //         let data= JSON.stringify({IdRoot,TestHistory,id,isIgnoreTest})
    //         let config = {
    //             headers: {
    //                 'Authorization': `Bearer  ${Token}`
    //             },
    //             params:{Type:nameTest},
    //         }
    //         return DataGuery.post<AskType>('api/Test/',data,config);
    //     });
    // },
    // EnableAllQuestions:(IdParent:string,isIgnore:boolean)=>{
    //     return AuthAPI.IsExistsToken().then(req=>{
    //         let Token=Cookies.get("Token");
    //         let data= JSON.stringify({IdParent,isIgnore})
    //         let config = {
    //             headers: {
    //                 'Authorization': `Bearer  ${Token}`
    //             },
    //             params: {IdParent,isIgnore}
    //         }
    //         return DataGuery.post<string>('api/Question/EnableAllQuestions',data,config);
    //     });
    // }
}