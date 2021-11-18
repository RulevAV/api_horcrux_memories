import {render, screen} from "@testing-library/react";
import React from "react";
import TableUsers from "./TableUsers";

const User = {
    id: 1,
    email:"email",
    lastName:"lastName",
    firstName:"firstName",
    userName:"userName",
    roles: ["role1","role2"],
}
const Users= [User];

const PropsType = {
    Users: Array[User],
    index: 1,
    idModal: "string",
    SetIdUser: (value) => {}
}
describe('Admin>TableUsers> component', ()=>{
    it('TableUsers Render', ()=>{
        let SetIdUser = ()=>{};
        let dom = render(<TableUsers Users={Users}  idModal={"User"} SetIdUser={SetIdUser}/>);
        let elem = dom.find
        //let thead = screen.;
        //screen.debug()
        //const linkElement = screen.getByText('Admin');
        //expect(onChange).toHaveBeenCalledTimes(5);
        //expect(Role).toBeInTheDocument();
    })

});