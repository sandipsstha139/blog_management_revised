import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./query/authService";
import { blogApi } from "./query/blogService";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, // Add reducer
    [blogApi.reducerPath]: blogApi.reducer, // Add reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, blogApi.middleware), // Add middleware
});
