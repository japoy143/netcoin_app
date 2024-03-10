import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setDaily: (state, action: PayloadAction<DailyUpdate[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setDaily } = DailyPriceUpdate.actions;

export default DailyPriceUpdate.reducer;
