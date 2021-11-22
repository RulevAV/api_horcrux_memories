import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Admin from "./Admin";
configure({ adapter: new Adapter() });


let AllRoles=["role1","role2","role3","role4","role5","role6"];

describe('Admin>TableUsers> component', ()=>{
    const GetUsers = jest.fn()

    it('RowTable test props', ()=>{
        let dom = mount(<Admin AllRoles={AllRoles}
                               GetUsers={GetUsers}
                               SetUserRoles={""}
                               Users={null}/>
        );
        expect(GetUsers).toHaveBeenCalled()
    })

});