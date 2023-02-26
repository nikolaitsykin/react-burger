import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  name: string;
  email: string;
  password: string;
  token: string;
  isAuth: boolean;
}

export const initialState: IAuthState = {
  name: "",
  email: "",
  password: "",
  isAuth: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IAuthState>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.password = action.payload.password;
      state.isAuth = true;
    },
    refreshUser(
      state,
      action: PayloadAction<{
        user: { name: string; email: string };
        isAuth: boolean;
      }>
    ) {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.isAuth = true;
    },
    loginSuccess(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.name = "";
      state.email = "";
      state.password = "";
      state.isAuth = false;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
