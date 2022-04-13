import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/redux-store';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
let root = document.getElementById('root');

ReactDOM.render( <BrowserRouter basename="/React">
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>, root)
