import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IIngredient, IIngredientResponse } from "../types/ingredientsTypes";
import { IOrderResponse } from "../types/orderTypes";
import { IUser, IUserResponse } from "../types/userTypes";

import {
  _EMAIL_RESET_URL,
  _ITEMS_URL,
  _LOGIN_URL,
  _LOGOUT_URL,
  _ORDERS_URL,
  _PASSWORD_RESET_URL,
  _REGISTER_URL,
  _TOKEN_URL,
  _USER_URL,
} from "../../utils/constants";
import { getCookie } from "../../utils/cookie";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://norma.nomoreparties.space/api/",
  }),
  endpoints: (build) => ({
    getIngredients: build.query<IIngredient[], string>({
      query: () => ({
        url: _ITEMS_URL,
      }),
      transformResponse: (response: IIngredientResponse) => response.data,
    }),
    postOrderData: build.mutation<IOrderResponse, string[]>({
      query: (addedIds: string[]) => ({
        url: _ORDERS_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify({ ingredients: addedIds }),
      }),
    }),
    forgotPassword: build.mutation<
      { success: boolean; message: string },
      string | undefined
    >({
      query: (email: string) => ({
        url: _PASSWORD_RESET_URL,
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }),
    }),
    resetPassword: build.mutation<{ success: boolean; message: string }, IUser>(
      {
        query: (userData) => ({
          url: _EMAIL_RESET_URL,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }),
      }
    ),
    register: build.mutation<IUserResponse, IUser>({
      query: (userData: { email: string; password: string; name: string }) => ({
        url: _REGISTER_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }),
    }),
    login: build.mutation<IUserResponse, IUser>({
      query: (userData: { email: string; password: string }) => ({
        url: _LOGIN_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }),
    }),
    logout: build.mutation<
      {
        success: boolean;
        message: string;
      },
      string | undefined
    >({
      query: (token: string) => ({
        url: _LOGOUT_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      }),
    }),
    getUser: build.query<IUserResponse, string | undefined>({
      query: (token: string) => ({
        url: _USER_URL,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    refreshToken: build.mutation<IUserResponse, string>({
      query: (token: string) => ({
        url: _TOKEN_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/",
        },
        body: JSON.stringify({
          token: token,
        }),
        transformResponse: (response: IIngredientResponse) => response.data,
      }),
    }),
    patchUserData: build.mutation<IUserResponse, IUser>({
      query: (userData: IUser) => ({
        url: _USER_URL,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: userData.name,
        }),
      }),
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  usePostOrderDataMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useRefreshTokenMutation,
  usePatchUserDataMutation,
} = api;
