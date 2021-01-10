import { Response, Request } from "miragejs";
import {
  AuthResponse,
  RegisterUserRequest,
  LoginUserRequest,
} from "../Types/server";
import { AppSchema } from "./SchemaModels";
import { generateToken } from "../Helpers";
import { handleErrorResponse } from "./Common/ErrorResponse";
import { Diary } from "../Types/store";

class MirageController {
  userSession: AuthResponse | null = null;

  MirageController() {
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
  // CRUD for Diary
  getAllUserDiaries = (schema: AppSchema, request: Request): Response | any => {
    const userId = request.params.userId;
    const user = schema.find("user", userId);
    console.log(user);
    if (user) {
      return { data: user.diary.models as Diary[] };
    } else {
      return handleErrorResponse(
        new Error("user not exist"),
        "Invalid User Id"
      );
    }
  };
  deleteUserDiary = (schema: any, request: Request): Response | any => {
    const userId = request.params.userId;
    const id = request.params.diaryId;

    const docRef = schema.diaries.findBy({ id, userId });
    if (docRef) {
      docRef.destroy();
      return { message: "Diary Deleted Successfully.", success: true };
    } else {
      return handleErrorResponse(
        new Error("You're not Authorized."),
        "You're not Authorized."
      );
    }
  };
  // getAllDiaryNotes = (schema: AppSchema, request: Request): Response | any => {
  //   const userId = request.params.userId;
  //   const user = schema.find("user", userId);
  //   console.log(user);
  //   if (user) {
  //     return { data: user.diary.models as Diary[] };
  //   } else {
  //     return handleErrorResponse(
  //       new Error("user not exist"),
  //       "Invalid User Id"
  //     );
  //   }
  // };
}
export default MirageController;
