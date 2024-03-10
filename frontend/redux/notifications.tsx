import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "../screens/HomePage/homepage";

export interface notifs {
  value: notification[];
}

const initialState: notifs = {
  value: [],
};

export const Notifications = createSlice({
  name: "latest notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<notification[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setNotifications } = Notifications.actions;

export default Notifications.reducer;
