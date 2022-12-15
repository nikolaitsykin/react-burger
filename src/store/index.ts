import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { rootReducer } from "../services/reducers";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
