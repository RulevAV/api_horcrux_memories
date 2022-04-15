import { object, string, ref } from 'yup';

export const validationSchema = object().shape({
    username: string().required("Введите имя"),
    firstName: string().required("Введите фамилия"),
    lastName: string().required("Введите отчество"),
    password: string().min(5).required("Введите пароль"),
    confirmPassword: string()
        .required()
        .oneOf([ref("password"), null], "Пароли должны совпадать"),
    email: string().email().required("Введите почту"),
});