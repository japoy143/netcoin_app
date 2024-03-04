import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { DailyUpdate } from "../screens/HomePage/homepage";

export interface Daily {
  value: DailyUpdate[];
}

const initialState: Daily = {
  value: [],
};

export const DailyPriceUpdate = createSlice({
  name: "daily price update",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<DailyUpdate[]>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = DailyPriceUpdate.actions;

export default DailyPriceUpdate.reducer;
