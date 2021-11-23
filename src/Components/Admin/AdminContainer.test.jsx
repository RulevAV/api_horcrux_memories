import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AdminCompose from "./AdminContainer";
import {Provider} from "react-redux";
import {cleanup, queryByAttribute, render,fireEvent} from "@testing-library/react";
import {LOG_OUT} from "../../redux/Auth-Reducer";
import {createStore} from "redux";

configure({ adapter: new Adapter() });

afterEach(cleanup);

const initialState = {
    AdminReducer:{
        Users : [],
        AllRoles : [],
    }

};
export const reducer = (state=initialState, action)=> {
    switch (action.type) {
        case "ADMIN_GET_USER":{
            return {
                ...state,
                Users:action.Users,
                AllRoles:action.AllRoles
            };
        }
        case "ADMIN_SET_USER_ROLES":{
            let mass = state.Users.map((e)=>{
                if(e.email !==action.Email)
                    return e;
                else return {
                    ...e,
                    roles:action.Roles
                }
            })
            return {
                ...state,
                Users :[
                    ...mass,
                ]
            };
        }
        case LOG_OUT: {
            return initialState;
        }
        default: return state;
    }
}
let Store = createStore(reducer,initialState);
Store.dispatch=jest.fn();

const renderWithRedux = (
    component,
    {initialState, store=Store}={}

)=>{
    return{
        ...render(  <Provider store={store} >{component}</Provider>),store
    }
};

describe('Admin>TableUsers> component', ()=>{

    it('RowTable test props', ()=>{
        let dom = renderWithRedux(<AdminCompose/>);
    })
    it('SetUserRoles', ()=>{
        let dom = renderWithRedux(<AdminCompose/>);
        const getById = queryByAttribute.bind(null, 'id');
        const btn = getById(dom.container, 'Save');
        fireEvent.click(btn);
        //expect(GetUsers).toHaveBeenCalled()
    })
    //Save

});