
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

jest.mock("react-dom", () => ({ render: jest.fn() }));

jest.mock("react-dom", () => ({ render: jest.fn() }));


describe("Application root", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        div.id = "root";
        document.body.appendChild(div);
        require("./index");
        expect(ReactDOM.render).toHaveBeenCalledWith(<BrowserRouter basename="/React">
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>, div);
    });
    it("reportWebVitals", () => {

        try {
            reportWebVitals(()=>{});
        }catch (e){
        }


    });
    it("reportWebVitals null", () => {

        try {
            reportWebVitals();
        }catch (e){
        }


    });
});