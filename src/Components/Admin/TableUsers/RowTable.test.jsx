import {render, screen,queryByAttribute } from "@testing-library/react";
import RowTable from "./RowTable";
import React from "react";

const User = {
    id: 1,
    email:"Data_email",
    lastName:"lastName",
    firstName:"firstName",
    userName:"userName",
    roles: ["role1","role2"],
}
const PropsType = {
    user: User,
    index: 0,
    idModal: "string",
    SetIdUser: (index,roles) => {}
}
describe('Admin>TableUsers> component', ()=>{
    //beforeAll()
//let fn = jest.fn(x=>x**2);
//expect(fn).toBeCalledTimes()
    it('RowTable Render without crashing', ()=>{
       let dom = render(<table>
            <tbody id="tbody">
                <RowTable {...PropsType}/>
            </tbody>
        </table>);
        const getById = queryByAttribute.bind(null, 'id');
        const temp = queryByAttribute("id",dom.container,"index");
        const index = getById(dom.container, 'index');
        const email = getById(dom.container, 'email');
        const lastName = getById(dom.container, 'lastName');
        const firstName = getById(dom.container, 'firstName');
        const userName = getById(dom.container, 'userName');
        const roles = getById(dom.container, 'roles');
        expect(temp.innerHTML).not.toContain()
        expect(temp.innerHTML).toBe(User.id.toString());
        expect(index.innerHTML).toBe(User.id.toString());
        expect(email.innerHTML).toBe(User.email);
        expect(lastName.innerHTML).toBe(User.lastName);
        expect(firstName.innerHTML).toBe(User.firstName);
        expect(userName.innerHTML).toBe(User.userName);
        expect(roles.innerHTML).toBe(User.roles.join("\n"));





        //screen.getbyid('index')

        //getBy //возвращает либо элемент либо ошибку. (затрудняет проверку которых в разметке быть не должно) из за условий не успевает отработать
        //queryBy - когда утверждаем что элемента нет в разметке
        //findBy - используется для асинхронных элементов(которых в
                   // начале разметке небыло но при выполнении асинхронного кода они появятся)

        //expect( screen.queryByText(/Что то левое/i)).toBeNull();//элемента быть не должно
        //expect( screen.getByRole('table')).toBeInTheDocument();//?

        ///expect( screen.getByLabelText(/temp/i)).toBeInTheDocument();//ищет текст по соответствующему тексту в label
        //expect( screen.getByPlaceholderText(/search text.../i)).toBeInTheDocument();

        //const linkElement = screen.getByText('Admin');
        /*expect(onChange).toHaveBeenCalledTimes(5);*/
       /* expect(Role).toBeInTheDocument();*/
    })

});