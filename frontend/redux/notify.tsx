import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const isNotified = createSlice({
  name: "is notification empty",
  initialState,
  reducers: {
    setNotify: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setNotify } = isNotified.actions;

export default isNotified.reducer;
