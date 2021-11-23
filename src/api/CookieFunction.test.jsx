import {setResponseCookie} from "./CookieFunction";

let data = {
    email: "maag@mail.ru",
    isAuthenticated: true,
    message: null,
    refreshToken: "B/pCeBNSMcIzp+A59rVlRjeepwI0qqtakZ2STWo/48Y=",
    refreshTokenExpiration: "2021-12-03T08:54:44.3834497Z",
    roles: (3) ['User', 'Moderator', 'Administrator'],
    token: "token-asdf",
    userName: "maag"
}

describe('Admin>TableUsers> component', ()=>{

    it('test getCookie', ()=>{
        setResponseCookie(data);
    })

});