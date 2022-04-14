import React, { useEffect } from 'react';
import './App.css';
import { Route, useHistory } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import { getUser } from './http/endpoints/user';
import { LoginContainer } from './Components/Auth/Login/LoginContainer';
import { useDispatch } from 'react-redux';
import { AuthActions } from './redux/User/Auth-Reducer';
import Cookies from 'js-cookie';
import { USER_AUTH_COOKIE_KEY } from './constans';
import RegistrationContainer from './Components/Auth/Registration/RegistrationContainer';
import { AdminContainer } from './Components/Admin/AdminContainer';
import { TestContainer } from './Components/Test/TestContainer';
import { HomeContainer } from './Components/Home/HomeContainer';
import { ModalWindowProvider } from './providers/ModalWindow/modal';

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
          <ModalWindowProvider>
            <Route render={() => <LoginContainer />} path="/login" />
            <Route render={() => <RegistrationContainer />} path="/registration" />
            <Route render={() => <AdminContainer />} exact path="/Admin" />
            <Route render={() => <HomeContainer />} exact path="/" />
            <Route render={() => <TestContainer />} exact path="/Test/:nameTest" />
          </ModalWindowProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
