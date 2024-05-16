import {
  authActions,
  authReducer,
  initialState,
} from "./../reducers/auth.slice";
import { AnyAction } from "redux";

const { loginSuccess, logout, setUser, refreshUser } = authActions;
const userMock = {
  email: "example@gmail.com",
  name: "User",
  password: "password",
  isAuth: true,
  token: "",
};

describe("RTK auth store", () => {
  it("Should return initial state", () => {
    const result = authReducer(undefined, {} as AnyAction);
    expect(result).toEqual(initialState);
  });

  it("Login success", () => {
    const result = authReducer(initialState, loginSuccess);
    expect(result).toEqual({
      ...initialState,
      isAuth: true,
    });
  });

  it("Logout success", () => {
    const result = authReducer(initialState, logout);
    expect(result).toEqual(initialState);
  });

  it("Adding user data", () => {
    const result = authReducer(initialState, setUser(userMock));
    expect(result).toEqual(userMock);
  });

  it("Refresh user data", () => {
    const result = authReducer(
      initialState,
      refreshUser({
        user: userMock,
        isAuth: true,
      })
    );
    expect(result).toEqual({
      ...initialState,
      email: "example@gmail.com",
      name: "User",
      isAuth: true,
    });
  });
});
