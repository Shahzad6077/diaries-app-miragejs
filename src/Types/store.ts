export interface User {
  id?: string | undefined;
  email: string | number;
  password?: string;
  createdAt: number;
}
export interface Note {
  id: string;
  txt: string;
  createdAt: number;
  userId?: string;
}
export interface Diary {
  id: string;
  txt: string;
  createdAt: number;
  userId?: string;
}

export interface DiariesSliceState {
  diaries: Diary[];
}

export interface AuthState {
  token?: string;
  user?: User;
  isAuthenticated: boolean;
}
