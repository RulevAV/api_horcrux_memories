import React, { useEffect } from 'react';
import './App.css';
import { Route, useHistory } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import { getUser } from './http/endpoints/user';
import { useDispatch } from 'react-redux';
import { AuthActions } from './redux/Auth/Auth-Reducer';
import Cookies from 'js-cookie';
import { USER_AUTH_COOKIE_KEY } from './constans';
import { TestContainer } from './Components/Test/TestContainer';
import { HomeContainer } from './Components/Home/HomeContainer';
import { ModalWindowProvider } from './providers/ModalWindow/modal';
import { Login } from './Components/Auth/Login';
import { Admin } from './Components/Admin';
import { Registration } from './Components/Auth/Registration';
import { ModalAlertProvider } from './providers/Alert/modal';

const App: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const initial = async () => {
    try {
      const data = await getUser();
      dispatch(AuthActions.setUser({ ...data, isAuthenticated: true }))
      return;
    } catch (error) {
      Cookies.remove(USER_AUTH_COOKIE_KEY);
    }
    history.push("/login");
  }

  useEffect(() => {
    (async () => {
      await initial();
    })();
  }, []);

  return (
    <div >
      <NavbarContainer />
      <div className="container">
        <div className={'app-wrapper-content'}>
          <ModalAlertProvider>
            <ModalWindowProvider>
              <Route render={() => <Registration />} path="/registration" />
              <Route render={() => <Login />} path="/login" />
              <Route render={() => <Admin />} exact path="/Admin" />


              <Route render={() => <HomeContainer />} exact path="/" />
              <Route render={() => <TestContainer />} exact path="/Test/:nameTest" />
            </ModalWindowProvider>
          </ModalAlertProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
