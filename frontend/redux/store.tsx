import { configureStore } from "@reduxjs/toolkit";
import dailyReducer from "./week";
import notificationReducer from "./notifications";
import coinsReducer from "./data";
import isnotifyReducer from "./notify";
export const store = configureStore({
  reducer: {
    daily: dailyReducer,
    notifications: notificationReducer,
    coins: coinsReducer,
    isnotify: isnotifyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
