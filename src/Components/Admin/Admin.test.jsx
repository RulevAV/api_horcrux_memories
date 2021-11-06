import {render, screen} from "@testing-library/react";

import Admin from "./Admin";
import userEvent from "@testing-library/user-event";

const onChange = jest.fn();

let data = {
    users:[{"idid":"1baf7feb-135e-4be7-918d-2ecf1cb04329","firstName":null,"lastName":null,"userName":"user","email":"user@secureapi.com","roles":["User","Moderator","Administrator"]}],
    allRoles:["User","Moderator","Administrator"]}

/*
describe('Admin component', ()=>{
        it('Admin Render', ()=>{
            render(<Admin {...data}/>);

            userEvent.type(screen.getByRole('textbox'), 'React')

            const linkElement = screen.getByText('Admin');
            expect(onChange).toHaveBeenCalledTimes(5);
            //expect(linkElement).toBeInTheDocument();
            /!*const Role = screen.getByRole('h1');
            expect(Role).toBeInTheDocument();*!/
        })

});*/
