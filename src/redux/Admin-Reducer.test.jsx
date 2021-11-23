import AdminReducer, {actions, GetUsersThunkCreator, initialState, SetUserRolesThunkCreator} from "./Admin-Reducer";
import {AuthAPI} from "../api/API_AuthServer";

jest.mock("../api/API_AuthServer")
const AuthAPIMock = AuthAPI;



let User1 = {
    id: 1,
    email:"user1@mail.ru",
    lastName:"user1",
    firstName:"user1",
    userName:"user1",
    roles: ["Admin","Moderator"],
}
let User2 = {
    id: 2,
    email:"user2@mail.ru",
    lastName:"user2",
    firstName:"user2",
    userName:"user2",
    roles: ["Admin","Moderator"],
}
let User3 = {
    id: 3,
    email:"user3@mail.ru",
    lastName:"user3",
    firstName:"user3",
    userName:"user3",
    roles: ["Admin","Moderator"],
}
let User4 = {
    id: 4,
    email:"user4@mail.ru",
    lastName:"user4",
    firstName:"user4",
    userName:"user4",
    roles: ["Admin","Moderator"],
}

let Users=[User1,User2,User3,User4];
let AllRoles=["role1","role2"];



describe('test admin reducer', ()=>{

    const dispatchMock = jest.fn();


    it('test action SetUsers', ()=>{
        //1 test state
        let SetUsers = actions.SetUsers(Users,AllRoles);
        //2 action
        let newState = AdminReducer(initialState,SetUsers);
        //3 expectation
        expect(newState.Users.length).toBe(4);
        expect(newState.AllRoles.length).toBe(2);
    });
    it('test action SetRoles', ()=>{
        let SetUsers = actions.SetUsers(Users,AllRoles);
        let newState = AdminReducer(initialState,SetUsers);


        //expectation1
        let SetRoles = actions.SetRoles("user3@mail.ru",["Admin"]);
        newState = AdminReducer(newState,SetRoles);
        expect(newState.Users[2].roles).toStrictEqual(["Admin"]);

        //expectation2
        SetRoles = actions.SetRoles("user2@mail.ru",[]);
        newState = AdminReducer(newState,SetRoles);
        expect(newState.Users[1].roles).toStrictEqual([]);

        //expectation3
        SetRoles = actions.SetRoles("user2@mail.ru",["a","b","c"]);
        newState = AdminReducer(newState,SetRoles);
        expect(newState.Users[1].roles).toStrictEqual(["a","b","c"]);
    });
    it('test action ClearState', ()=>{
        //1 test state
        let SetUsers = actions.SetUsers(Users,AllRoles);
        //2 action
        let newState = AdminReducer(initialState,SetUsers);

        //expectation
        let ClearState = actions.ClearState();
        newState = AdminReducer(newState,ClearState);
        expect(newState).toStrictEqual(initialState);
    });
    it('test action ThunkCreator',async ()=>{
        const thunk = GetUsersThunkCreator();
        const response ={
            data :{
                users:[],
                allRoles:[]
            }
        };
        let prom = Promise.resolve(response);
        AuthAPIMock.GetUser.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
    it('test action SetUserRolesThunkCreator', async()=>{
        const thunk = SetUserRolesThunkCreator();

        let prom = Promise.resolve();
        AuthAPIMock.AddDeleteRole.mockReturnValue(prom);
        await thunk(dispatchMock,()=>{});
        expect(dispatchMock).toBeCalled();
    });
})

