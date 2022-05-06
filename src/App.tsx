import React, { useEffect, useState } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import { useDispatch } from 'react-redux';
import { AuthActions } from './redux/Auth/Auth-Reducer';
import { Login } from './screen/Login';
import { Admin } from './screen/Admin';
import { Registration } from './screen/Registration';
import moment from "moment-ru";
import { Home } from './screen/Home';
import { Test } from './screen/Test';
import Redact from './screen/Redact';
import { getUserData } from './http/data/user';
import LoadingContainer from './Components/Loading/LoadingContainer';
import { Create } from './screen/Create';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    const initial = async () => {
      setLoading(true);
      try {
        const data = await getUserData();
        dispatch(AuthActions.setUser({ ...data, isAuthenticated: true }))
      } catch (error) {

      }
      moment.locale('ru');
      setLoading(false);
    }

    initial();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  if (isloading)
    return <>
      Loading....
    </>

  return (
    <div >
      <LoadingContainer>
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
      </LoadingContainer>
    </div>
  );
}

export default App;
