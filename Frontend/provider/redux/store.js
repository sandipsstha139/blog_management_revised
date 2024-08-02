import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./query/authService";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, // Add reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), // Add middleware
});
