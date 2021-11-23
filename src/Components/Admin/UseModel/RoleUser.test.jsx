import RoleUser from "./RoleUser";
import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
describe('Admin>UseModel> RoleUser', ()=>{
    const fn = jest.fn()

    it('RoleUser test click Delete', ()=>{
        let dom = mount(<table>
            <tbody>
            <RoleUser index={0} name={"name"} DeleteRole={fn} />
            </tbody>
        </table>);
        let btn = dom.find('#btnDelete');
        btn.simulate('click');
        expect(fn).toHaveBeenCalled()
    })

});