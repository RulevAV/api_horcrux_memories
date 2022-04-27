import React, { useEffect, useState } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import { getUser } from './http/endpoints/user';
import { useDispatch } from 'react-redux';
import { AuthActions } from './redux/Auth/Auth-Reducer';
import Cookies from 'js-cookie';
import { USER_AUTH_COOKIE_KEY } from './constans';
import { Login } from './screen/Login';
import { Admin } from './screen/Admin';
import { Registration } from './screen/Registration';
import moment from "moment-ru";
import { Home } from './screen/Home';
import { Test } from './screen/Test';
import Redact from './screen/Redact';
import Create from './Components/Create/Create';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isloading, setLoading] = useState(true);

  const initial = async () => {
    try {
      const data = await getUser();
      dispatch(AuthActions.setUser({ ...data, isAuthenticated: true }))
      return;
    } catch (error) {
      Cookies.remove(USER_AUTH_COOKIE_KEY);
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await initial();
      moment.locale('ru');
      setLoading(false);
    })();
  }, []);


  if (isloading)
    return <>Loading....</>
  return (
    <div >
      <NavbarContainer />
      <div className="container">
        <div className={'app-wrapper-content'}>
          <Route render={() => <Registration />} path="/registration" />
          <Route render={() => <Login />} path="/login" />
          <Route render={() => <Admin />} exact path="/Admin" />
          <Route render={() => <Home />} exact path="/" />
          <Route render={() => <Test />} exact path="/Test" />
          <Route render={() => <Redact />} exact path="/Redact" />
          <Route render={() => <Create />} exact path="/create" />
        </div>
      </div>
    </div>
  );
}

export default App;
