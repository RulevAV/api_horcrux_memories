export interface LoginApi  {
    isAuthenticated: boolean,
    userName: string,
    email: string,
    roles: string[],
    message: string
};

export type UserType = {
    id: number,
    email:string,
    lastName:string,
    firstName:string,
    userName:string,
    roles: Array<string>,
}

export type GetUserType = {
    users:Array<UserType>,
    allRoles:Array<string>
}