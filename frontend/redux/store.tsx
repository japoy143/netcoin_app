import { configureStore } from "@reduxjs/toolkit";
import dailyReducer from "./week";
import notificationReducer from "./notifications";
import coinsReducer from "./data";
export const store = configureStore({
  reducer: {
    daily: dailyReducer,
    notifications: notificationReducer,
    coins: coinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
