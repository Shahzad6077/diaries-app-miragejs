export interface User {
  id?: string | undefined;
  email: string | number;
  password?: string;
  createdAt: number;
}
export interface Note {
  id?: string | number;
  txt: string;
  createdAt: number;
  user?: User | string;
}
export interface Diary {
  id?: string | number;
  txt: string;
  createdAt: string;
  user?: User | string;
  note?: Note | string;
}

export interface DiariesSliceState {
  diaries: Diary[];
}

export interface AuthState {
  token: string;
  user: User;
  isAuthenticated: boolean;
}
