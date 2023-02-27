import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { authReducer } from "./auth.slice";
import { constructorReducer } from "./constructor.slice";
import { ingredientsReducer } from "./ingredients.slice";
import { modalReducer } from "./modal.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    modal: modalReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
