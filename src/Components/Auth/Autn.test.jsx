import {LOG_OUT} from "../../redux/Auth-Reducer";
import {createStore} from "redux";
import {fireEvent, queryByAttribute, render,screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import Login from "./Login/LoginContainer";
import Registration from "./Registration/RegistrationContainer";
import {outValid, useInput} from "./UseValidator";

let initialState = {
    authReducer:{
        Auth:{
            message: null,
            isAuthenticated: false,
            userName: null,
            email: null,
            roles: [],
            token: null,
            refreshToken: null,
            refreshTokenExpiration: null
        },
        Register: {
            isRegister : false,
            LoginRegistration:"",
        }
    }

};


export const reducer = (state=initialState, action)=> {
    switch (action.type) {
        case "SET_USER_DATA":{
            return {
                ...state,
                Auth:{
                    ...action.data,
                },
            };
        }
        case LOG_OUT:{
            return initialState
        }
        case "USER_REGISTER":{
            return {
                ...state,
                Register: {
                    ...state.Register,
                    isRegister : action.isRegister,

                }
            };
        }
        default: return state;
    }
}
const updateState = (NewState)=>{
    let NewStore = createStore(reducer,NewState);
    NewStore.dispatch=jest.fn();
    return NewStore;
}

let Store = updateState(initialState);


const renderWithRedux = (
    component, State

)=>{
    let store = State?updateState(State):Store;
    return{
        ...render( <BrowserRouter basename="/">
            <Provider store={store} >{component}</Provider>
        </BrowserRouter>),store
    }
};

describe('Auth component', ()=>{
    //Login
    it('Login Registration click', ()=>{
                let dom = renderWithRedux(<Login/>);
                const getById = queryByAttribute.bind(null, 'id');
                const btn = getById(dom.container, 'Registration');
                fireEvent.click(btn);
    })
    it('Login SetUser', ()=>{

        let dom = renderWithRedux(<Login/>);
        const getById = queryByAttribute.bind(null, 'id');
        const btn = getById(dom.container, 'Exit');
        fireEvent.click(btn);
    })
    it('change input login', ()=>{

        let dom = renderWithRedux(<Login/>);
        //const getById = queryByAttribute.bind(null, 'id');
        // const input = getById(dom.container, '#Login');
        const input = dom.container.querySelector("#Login");

        //screen.debug(input);
        fireEvent.change(input, {target: {value: '24/05/2020'}})
        expect(input).toHaveValue("24/05/2020")
    })
    it('onBlur input login', ()=>{

        let dom = renderWithRedux(<Login/>);
        //const getById = queryByAttribute.bind(null, 'id');
        // const input = getById(dom.container, '#Login');
        const input = dom.container.querySelector("#Login");
        //screen.debug(input);
        fireEvent.click(input);
        fireEvent.blur(input)

    })
    //Registration
    it('Registration click Register', ()=>{
        let dom = renderWithRedux(<Registration/>);
        const getById = queryByAttribute.bind(null, 'id');
        const btn = getById(dom.container, 'Register');
        fireEvent.click(btn);
    })
    it('User is Registration', ()=> {
        let NewState = JSON.parse(JSON.stringify(initialState));
        NewState.authReducer.Register.isRegister=true;
        let dom = renderWithRedux(<Registration/>,NewState);
    });
    //Validation input login
    it('test useValidation no parameters', ()=>{
        let TestComponent = ()=>{
            const login = useInput("",{NoExistProperty:"asd"});
            return <div>
                <input onChange={login.onChange}/>
            </div>
        }
        let dom = renderWithRedux(<TestComponent/>);
    })
    it('test useValidation IsEmpty', ()=>{
        let TestComponent = ()=>{
            const Input = useInput("",{isEmpty:true});
            return <div>
                <input id={"Input"} onChange={Input.onChange} onBlur={Input.onBlur} value={Input.value}/>
                {outValid(Input)}
            </div>
        }
        let dom = renderWithRedux(<TestComponent/>);

        const input = dom.container.querySelector("#Input");
        fireEvent.click(input);
        fireEvent.blur(input);
        dom.getByText(/Поле не должно быть пустым/i);
    })
    it('test useValidation minLength', ()=>{
        let TestComponent = ()=>{
            const Input = useInput("",{minLength:3});
            return <div>
                <input id={"Input"} onChange={Input.onChange} onBlur={Input.onBlur} value={Input.value}/>
                {outValid(Input)}
            </div>
        }
        let dom = renderWithRedux(<TestComponent/>);

        const input = dom.container.querySelector("#Input");
        fireEvent.click(input);
        fireEvent.blur(input);
        dom.getByText(/Поле не должно быть меньше/i);
    })
    it('test useValidation maxLength', ()=>{
        let TestComponent = ()=>{
            const Input = useInput("",{maxLength:8});
            return <div>
                <input id={"Input"} onChange={Input.onChange} onBlur={Input.onBlur} value={Input.value}/>
                {outValid(Input)}
            </div>
        }
        let dom = renderWithRedux(<TestComponent/>);

        const input = dom.container.querySelector("#Input");
        fireEvent.change(input, {target: {value: '123456789'}})
        fireEvent.blur(input);
        dom.getByText(/Поле не должно быть больше/i);
    })
    it('test useValidation isEmail', ()=>{
        let TestComponent = ()=>{
            const Input = useInput("",{isEmail:true});
            return <div>
                <input id={"Input"} onChange={Input.onChange} onBlur={Input.onBlur} value={Input.value}/>
                {outValid(Input)}
            </div>
        }
        let dom = renderWithRedux(<TestComponent/>);

        const input = dom.container.querySelector("#Input");
        fireEvent.blur(input);
        fireEvent.click(input);
        dom.getByText(/Не является почтой/i);
    })

});