import React from "react";
import TableUsers from "./TableUsers";
import {configure, mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });


const User = {
    id: 1,
    email:"email",
    lastName:"lastName",
    firstName:"firstName",
    userName:"userName",
    roles: ["role1","role2"],
}
const Users= [User];

const RowAttribute = (row,Attribute)=>{
    let mass = row.map((childNode) => {
        return childNode.prop(Attribute);
    })
    return mass;
}

describe('Admin>TableUsers> component', ()=>{
    it('TableUsers Render', ()=>{
        let SetIdUser = ()=>{};
        let dom = mount(<TableUsers Users={Users}  idModal={"User"} SetIdUser={SetIdUser}/>);
        let row = dom.find("thead tr").children();
        let row2 = dom.find("tbody tr").children();

        expect(RowAttribute(row,"id")).toMatchObject(RowAttribute(row2,"id"));


    })

});