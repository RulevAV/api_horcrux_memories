import {render, screen} from "@testing-library/react";
import React, {useRef} from "react";
import Pagination from "./Pagination";

let sizePage = 1;
let page=2;
let stories = [{idParent:"",page:5}];
describe('Pagination component', ()=>{
    const fn = jest.fn()
    const focus = jest.fn();
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { focus } });
    it('Pagination Render', ()=>{

        render( <Pagination sizePage={sizePage} page={page} stories={stories} GetQuestsPagination={fn} Link={useRefSpy}/>)

    })

});