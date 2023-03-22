import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { api } from "./api";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { authReducer } from "./reducers/auth.slice";
import { constructorReducer } from "./reducers/constructor.slice";
import { ingredientsReducer } from "./reducers/ingredients.slice";
import { modalReducer } from "./reducers/modal.slice";
import { wsActions, wsReducer } from "./reducers/ws.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    modal: modalReducer,
    auth: authReducer,
    ws: wsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      api.middleware,
      socketMiddleware(wsActions),
    ]);
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
