import { initialStateType } from "./types";

export const initialState : initialStateType = {
    isAuthenticated: false,
    userName: "",
    email: "",
    roles: [] as string[],
    message: ""
};