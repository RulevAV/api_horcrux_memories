import { object, string } from 'yup';

export const validationSchema = object().shape({
    login: string().required("Введите логин"),
    password: string().min(5).required("Введите пароль"),
});