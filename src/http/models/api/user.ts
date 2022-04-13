export interface LoginApi  {
    isAuthenticated: boolean,
    userName: string,
    email: string,
    roles: string[],
    message: string
};