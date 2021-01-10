import { Diary, Note, User } from "./store";

export interface DiaryM extends Diary {
  note: Note | string;
}
export interface NoteM extends Note {
  diary: Diary | string;
}

export interface ConfigureServer {
  environment: "DEV" | "PRODUCTION";
}

export interface AuthResponse {
  user: Partial<User>;
  token: string;
}
export interface RegisterUserRequest {
  user: User;
}
export interface LoginUserRequest {
  email: string;
  password: string;
}
