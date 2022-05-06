import { FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import user from '../../img/among_us_player_light_green_icon_156936.png';
import Input from '../Form/Input';
import { initial } from './initial-values';
import { validationSchema } from "./validation.schema"

type PropsType = {
  setLogin: (login: string, password: string) => void,
}

const Login: React.FC<PropsType> = ({ setLogin }) => {
  const form = useFormik({
    initialValues: initial,
    validateOnBlur: false,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, actions) => {
      setLogin(values.login, values.password);
    }
  });

  useEffect(() => {
    form.setValues({
      ...initial,
      login: "maag@mail.ru",
      password: "Pa$$w0rd."
    });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return <div className={"container d-flex align-items-center justify-content-center"}>
    <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
      <FormikProvider value={form}>
        <Form onSubmit={form.handleSubmit} className={"shadow-lg p-5 mb-5 mt-5 bg-white rounded"}>
          <fieldset >
            <legend className='text-center'>Авторизация</legend>
            <div className={"d-flex align-items-center justify-content-center"}>
              <img src={user} style={{ height: 100, width: 100 }} alt="icon_User" />
            </div>

            <div className="mb-3">
              <Input className="form-control" name="login" label="Логин" placeholder="Введите логин" />
            </div>

            <div className="mb-3">
              <Input type={"password"} className="form-control" name="password" label="Пароль" placeholder="Введите пароль" />
            </div>

            <div className="mb-3">
              <Input type={"checkbox"} className="form-check-input" name="rememberMe" label="Запоинить меня?" />
            </div>

            <div className="mb-3">
              <NavLink id={"Registration"} className="link-success p-3" to={"/registration"}>Зарегаться</NavLink>
              <a className="link-success" href={"https://maagserver/HorcruxMemories/Account/ForgotPassword"}>Забыли пароль?</a>
            </div>

            <div className="row">
              <button id={"Exit"} type="submit" className="btn btn-primary">Войти</button>
            </div>
          </fieldset>
        </Form>
      </FormikProvider>
    </div>
  </div>
}

export default Login;