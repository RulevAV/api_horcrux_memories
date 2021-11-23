
import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ModalContent from "./ModalContent";
configure({ adapter: new Adapter() });

let UserRoles=["role1","role3","role6"];
let IdUser = "qwe-45";
let AllRoles=["role1","role2","role3","role4","role5","role6"];

describe('Admin>UseModel>ModalContent component', ()=>{
    const fn = jest.fn()

    it('ModalContent test props', ()=>{
        let dom = mount(<ModalContent
            SetIdUser={"qwe-123"}
            AllRoles={AllRoles}
            Email={"Email"}
            idModal={"User"}
            UserRoles={UserRoles}
            IdUser={IdUser}
            SetUserRoles={fn}/>
        );
       let btn = dom.find('#Save');
        btn.simulate('click');
        expect(fn).toHaveBeenCalled()
    })
    it('ModalContent test hidden', ()=>{
        let dom = mount(<ModalContent
            SetIdUser={"qwe-123"}
            AllRoles={AllRoles}
            Email={"Email"}
            idModal={"User"}
            UserRoles={UserRoles}
            IdUser={IdUser}
            SetUserRoles={fn}/>
        );
        /*let Save = dom.find('#Save');
        Save.simulate('click');
        let Close = dom.find('#Close');
        Close.simulate('click');*/

    })
});