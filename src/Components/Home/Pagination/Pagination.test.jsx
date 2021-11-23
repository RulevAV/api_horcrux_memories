import React from "react";
import Pagination from "./Pagination";
import {configure, mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });
let sizePage = 2;
let page=1;
let stories = [{idParent:"",page:5}];
describe('Pagination component', ()=>{
    const fn = jest.fn()
    const focus = jest.fn();
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { focus } });
    it('Pagination Render', ()=>{

        let dom = mount( <Pagination id={"Pagination"} sizePage={sizePage} page={page} stories={stories} GetQuestsPagination={fn} Link={useRefSpy}/>)
        let btn = dom.find("a");
        for(let i=0; i<btn.length;i++)
        {
            btn.at(i).simulate("click");
        }

        //fireEvent.click(btn);
        //const btn2 = getById(dom.container, 'PaginationNext');
        //fireEvent.click(btn2);
    })

});