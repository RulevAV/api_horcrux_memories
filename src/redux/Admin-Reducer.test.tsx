import AdminReducer, {
     AdminActions,
    AdminActionsThunkCreator,
     initialState,
    } from "./Admin-Reducer";
import {AuthAPI} from "../api/API_AuthServer";
import store, {reducer} from "./redux-store";

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
        let SetUsers = AdminActions.SetUsers(Users,AllRoles);
        //2 action
        let newState = AdminReducer(initialState,SetUsers);
        //3 expectation
        expect(newState.users.length).toBe(4);
        expect(newState.allRoles.length).toBe(2);
    });
    it('test action SetRoles', ()=>{
        let SetUsers = AdminActions.SetUsers(Users,AllRoles);
        let newState = AdminReducer(initialState,SetUsers);


        //expectation1
        let SetRoles = AdminActions.SetRoles("user3@mail.ru",["Admin"]);
        newState = AdminReducer(newState,SetRoles);
        expect(newState.users[2].roles).toStrictEqual(["Admin"]);

        //expectation2
        SetRoles = AdminActions.SetRoles("user2@mail.ru",[]);
        newState = AdminReducer(newState,SetRoles);
        expect(newState.users[1].roles).toStrictEqual([]);

        //expectation3
        SetRoles = AdminActions.SetRoles("user2@mail.ru",["a","b","c"]);
        newState = AdminReducer(newState,SetRoles);
        expect(newState.users[1].roles).toStrictEqual(["a","b","c"]);
    });
    it('test action ClearState', ()=>{
        //1 test state
        let SetUsers = AdminActions.SetUsers(Users,AllRoles);
        //2 action
        let newState = AdminReducer(initialState,SetUsers);

        //expectation
        let ClearState = AdminActions.ClearState();
        newState = AdminReducer(newState,ClearState);
        expect(newState).toStrictEqual(initialState);
    });
    it('test action LogOut', ()=>{
        //1 test state
        let SetUsers = AdminActions.LogOut();
        let newState = AdminReducer(initialState,SetUsers);

        //expectation
        expect(newState).toMatchObject(initialState);
    });
    //ThunkCreator
    it('test action GetUsers',async ()=>{
        const thunk =AdminActionsThunkCreator.GetUsers();
        const response ={
            data :{
                users:[],
                allRoles:[]
            }
        };
        let prom = Promise.resolve(response);
        let GetUser = jest.fn();
        GetUser.mockReturnValue(prom);
        AuthAPIMock.GetUser=GetUser;
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
    it('test action SetUserRoles', async()=>{
        const thunk = AdminActionsThunkCreator.SetUserRoles("",[""]);
        let prom = Promise.resolve();
        let AddDeleteRole = jest.fn();
        AddDeleteRole.mockReturnValue(prom);
        AuthAPIMock.AddDeleteRole=AddDeleteRole;

        // @ts-ignore
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalled();
    });
})

