import { Response, Request } from "miragejs";
import {
  AuthResponse,
  RegisterUserRequest,
  LoginUserRequest,
} from "../../Types/server";
import { AppSchema } from "./../SchemaModels";
import { generateToken } from "../../Helpers";
import { handleErrorResponse } from "./../Common/ErrorResponse";

class AuthController {
  userSession: AuthResponse | null = null;

  AuthController() {
    this.userSession = null;
  }
  // Register the user
  registerUser = (
    schema: AppSchema,
    request: Request
  ): Response | AuthResponse => {
    let { user }: RegisterUserRequest = JSON.parse(request.requestBody);
    console.log(user);
    const createdUser = schema.create("user", user);
    const token = generateToken(11);
    const res = {
      token,
      user: {
        ...createdUser.attrs,
        password: undefined,
      },
    };
    window.localStorage.setItem("userSession", JSON.stringify(res));
    return res;
  };
  // Login the user
  loginUser = (schema: any, request: Request): Response | AuthResponse => {
    let { email, password }: LoginUserRequest = JSON.parse(request.requestBody);
    console.log("userSession", this.userSession, email, password);
    const existingUser = schema.findBy("user", { email });
    if (!existingUser) {
      return handleErrorResponse(null, "User not found");
    }
    if (existingUser.password !== password) {
      return handleErrorResponse(null, "Invalid Credentials");
    }
    const token = generateToken(11);
    const res = {
      token,
      user: {
        email: existingUser.email,
        id: existingUser.id,
        createdAt: existingUser.createdAt,
      },
    };
    this.userSession = res;
    window.localStorage.setItem("userSession", JSON.stringify(res));
    return res;
  };
  logout = () => {
    this.userSession = null;
    window.localStorage.removeItem("userSession");
    return { success: true, message: "Logout Successfully" };
  };
  isAuthenticated = () => {
    const getSession = window.localStorage.getItem("userSession");
    if (!getSession) {
      return { isAuthenticated: false };
    } else {
      return { ...JSON.parse(getSession), isAuthenticated: true };
    }
  };
}
export default AuthController;
