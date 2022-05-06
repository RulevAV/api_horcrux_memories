import { initialStateType } from "../../redux/Auth/types";

export const user: initialStateType = {
  isAuthenticated: true,
  userName: "userName",
  email: "email",
  roles: ["roles1", "roles2", "roles3"],
  message: "message"
}