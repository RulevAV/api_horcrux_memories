import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/redux-store';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ModalAlertProvider } from './providers/Alert/modal';
import { ModalWindowProvider } from './providers/ModalWindow/modal';
import { ModalImgProvider } from './providers/ModalImg/useModalImg';
let root = document.getElementById('root');

ReactDOM.render(<BrowserRouter basename="/React">
    <Provider store={store}>
        <ModalImgProvider>
        <ModalAlertProvider>
            <ModalWindowProvider>
                <App />
            </ModalWindowProvider>
        </ModalAlertProvider>
        </ModalImgProvider>
    </Provider>
</BrowserRouter>, root)
