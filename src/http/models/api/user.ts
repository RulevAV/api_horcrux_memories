export interface LoginApi  {
    isAuthenticated: boolean,
    userName: string,
    email: string,
    roles: string[],
    message: string
};

export type UserType = {
    id: string,
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

export type AuthType={
    email: string
    isAuthenticated: boolean
    message: null|string
    refreshToken: string
    refreshTokenExpiration: string
    roles: Array<string>
    token: string
    userName:string
}