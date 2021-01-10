import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState } from "./../../Types/store";

let initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onAuthSet: (state, action: PayloadAction<AuthState>) => {
      const authResponse = action.payload;
      console.log(authResponse);
      if (authResponse.isAuthenticated) {
        return {
          ...authResponse,
        };
      } else {
        return {
          isAuthenticated: false,
        };
      }
    },
    logout: () => {
      return { isAuthenticated: false };
    },
  },
});
export const { logout, onAuthSet } = authSlice.actions;

export default authSlice.reducer;
