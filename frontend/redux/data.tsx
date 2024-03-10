import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const CryptoData = createSlice({
  name: "data for crypto",
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setCoins } = CryptoData.actions;

export default CryptoData.reducer;
