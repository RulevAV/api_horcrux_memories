import React from "react";
import {configure, mount, shallow} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UserRolesComp, {AddRole, balance, DeleteRole} from "./UserRolesComp";
import ModalContent from "./ModalContent";
configure({ adapter: new Adapter() });

let UserRoles;
let IdUser;
let SelectRoles;
let AllRoles;
let MenuDrop;

const Setdropdown=(drop)=>{
    MenuDrop=drop;
}
const SetSelectRoles=(Roles)=>{
    SelectRoles=Roles;
}

describe('Admin>UseModel UserRolesComp', ()=>{
    const fn = jest.fn();
    beforeEach(()=>{
        UserRoles=["role1","role3","role6"];
        IdUser = "qwe-45";
        SelectRoles=[];
        AllRoles=["role1","role2","role3","role4","role5","role6"];
        MenuDrop=[];
    })
    //balance
    it('test balance UserRoles null', ()=>{
        balance(null,null,Setdropdown,SetSelectRoles)
        expect(MenuDrop).toBeNull();
        expect(SelectRoles).toBeNull();

    })
    it('test balance', ()=>{
        balance(UserRoles,AllRoles,Setdropdown,SetSelectRoles)
        expect(MenuDrop).toMatchObject(["role2","role4","role5",]);
        expect(SelectRoles).toMatchObject(["role1","role3","role6"]);
    })
    //AddRole
    it('test AddRole', ()=>{
        AddRole("role2",UserRoles,AllRoles,Setdropdown,SetSelectRoles)
        expect(MenuDrop).toMatchObject(["role4","role5"]);
        expect(SelectRoles).toMatchObject(["role1","role3","role6","role2"]);
    })
    it('test AddRole name null', ()=>{
        AddRole(null,null,AllRoles,Setdropdown,SetSelectRoles)
        expect(MenuDrop).not.toBeNull();
        expect(SelectRoles).not.toBeNull();
    })
    //DeleteRole
    it('test DeleteRole', ()=>{
        DeleteRole("role3",UserRoles,AllRoles,Setdropdown,SetSelectRoles)
        expect(MenuDrop).toMatchObject(["role2","role3","role4","role5"]);
        expect(SelectRoles).toMatchObject(["role1","role6"]);
    })
    //Render
    it('test Render UserRolesComp null', ()=>{
        let dom = mount(  <UserRolesComp UserRoles={UserRoles}
                                         IdUser={IdUser}
                                         SelectRoles={SelectRoles}
                                         SetSelectRoles={fn}
                                         AllRoles={AllRoles}/>);
    })
    it('test Render UserRolesComp', ()=>{
        const dom = mount(  <UserRolesComp UserRoles={UserRoles}
                                         IdUser={IdUser}
                                         SelectRoles={null}
                                         SetSelectRoles={fn}
                                         AllRoles={AllRoles}/>)
let AllRolesUI = dom.children();
        console.log(AllRolesUI)
        //expect(AllRolesUI).toHaveBeenCalled();
    });


});