import { combineReducers } from "@reduxjs/toolkit";

import diariesReducer from "./Slices/diaries";
// import authReducer from "./Slices/auth";

// HERE WE PASS OUR REDUCERS.
const rootReducer = combineReducers({ diariesReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
