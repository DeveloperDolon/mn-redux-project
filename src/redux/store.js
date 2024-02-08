import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./features/baseApi/baseApi";
import userSlice from "./features/users/userSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
