import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DiariesSliceState, Diary } from "./../../Types/store";

let initialState: DiariesSliceState = {
  diaries: [],
};

const diarySlice = createSlice({
  name: "diaires-slice",
  initialState,
  reducers: {
    addDiary(state, action: PayloadAction<Diary>) {
      const { createdAt, txt, user } = action.payload;
    },
    removeDiary: (state, action: PayloadAction<string>) => {},
    clearDiaries: (state, action: PayloadAction) => {
      return { ...initialState };
    },
  },
});
export const {} = diarySlice.actions;

export default diarySlice.reducer;
