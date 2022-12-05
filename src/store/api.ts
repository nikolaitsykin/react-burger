import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IIngredient, ServerResponse } from "../models/models";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://norma.nomoreparties.space/api/",
  }),
  endpoints: (build) => ({
    getIngredients: build.query<IIngredient[], any>({
      query: () => ({
        url: `ingredients`,
        // method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ ingredients: orderData }),
      }),
      transformResponse: (response: ServerResponse) => response.data,
    }),
  }),
});

export const { useGetIngredientsQuery } = api;
