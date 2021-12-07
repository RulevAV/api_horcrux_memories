
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

export type RevokeTokenType ={
    message: string
}

export type AllRefreshTokenUsers={
    created: string
    expires: string
    isActive: boolean
    isExpired: boolean
    revoked: string
    token: string
}