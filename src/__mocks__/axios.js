export default {

    create:()=>{
        return AuthGuery
    },
}


const AuthGuery = {
    get:jest.fn(),
    post:(url,data)=>{
        switch (url)
        {
            case "api/user/token":{
                let  response ={
                    data:{}
                }
                let p =Promise.resolve(response)
                return p;
            }
            case "api/user/refresh-token":{
                let  response ={
                    data:{}
                }
                let p =Promise.resolve(response)
                return p;
            }
            case "api/user/register":{
                let  response ={
                    data:{}
                }
                let p =Promise.resolve(response)
                return p;
            }
        }


    },
}