import React from "react";
import {configure,mount} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import QuestionTest from "./QuestionTest";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../../redux/redux-store";
import images from "../../../img/2T5qG95FFcs.jpg";
configure({ adapter: new Adapter() });



describe('Admin>TableUsers> component', ()=>{

    let QuestionTestFun = jest.fn();
    let SetIsHiddenFun = jest.fn();
    it('RowTable test props', ()=>{
        /*let dom = mount(  <BrowserRouter basename="/">
                <Provider store={store}>
                    <QuestionTest images={images} QuestionTestFun={QuestionTestFun} SetIsHidden={SetIsHiddenFun}/>
                </Provider>
            </BrowserRouter>
        );

        let temp1 = dom.find('[value="Дальше"]')
        temp1.simulate("click");
        let temp2 = dom.find('[value="Показать"]')
        temp2.simulate("click");*/
    })

});