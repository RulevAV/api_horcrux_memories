import { FormikProvider, useFormik } from 'formik';
import React from 'react'
import { Form } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import Input from '../Form/Input';
import { initial } from './initial-values';
import { validationSchema } from "./validation.schema";
import user from "../../img/2998137-clover-four-leaf_99856.svg";

type PropsType = {
    alertModal : (username: string, firstName: string, lastName: string, password: string, email: string)=>void
}

const Registration : React.FC<PropsType> = ({alertModal}) => {

    const form = useFormik({
        initialValues: initial,
        validateOnBlur: false,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, actions) => {
            alertModal(values.username, values.firstName, values.lastName, values.password, values.email);
        }
    });

    return <div className={"container d-flex align-items-center justify-content-center"}>
        <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
            <FormikProvider value={form}>
                <Form onSubmit={form.handleSubmit} className={"shadow-lg p-5 mb-5 mt-5 bg-white rounded"}>
                    <fieldset >
                        <legend className='text-center'>Регистрация</legend>

                        <div className={"d-flex align-items-center justify-content-center"}>
                            <img src={user} style={{ height: 100, width: 100 }} alt="icon_User" />
                        </div>

                        <div className="mb-3">
                            <Input className="form-control" name="username" label="Логин" placeholder="Введите логин " />
                        </div>

                        <div className="mb-3">
                            <Input className="form-control" name="lastName" label="Имя" placeholder="Введите имя" />
                        </div>

                        <div className="mb-3">
                            <Input className="form-control" name="firstName" label="Фамилия" placeholder="Введите фамилию" />
                        </div>

                        <div className="mb-3">
                            <Input type={"password"} className="form-control" name="password" label="Пароль" placeholder="Введите пароль" />
                        </div>

                        <div className="mb-3">
                            <Input type={"password"} className="form-control" name="confirmPassword" label="Повторный пароль" placeholder="Введите пароль" />
                        </div>

                        <div className="mb-3">
                            <Input className="form-control" name="email" label="Почта" placeholder="Введите почту" />
                        </div>

                        <div className="mb-3">
                            <NavLink id={"login"} className="link-success p-3" to={"/login"}>Авторизоваться</NavLink>
                        </div>

                        <div className="row">
                            <button id={"Exit"} type="submit" className="btn btn-primary">Зарегистрироваться</button>
                        </div>
                    </fieldset>
                </Form>
            </FormikProvider>
        </div>
    </div>
}

export default Registration;
