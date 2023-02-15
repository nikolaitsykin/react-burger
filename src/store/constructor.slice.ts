import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderResponse } from "../models/models";

interface IBurgerConstructorState {
  orderName: string;
  orderNumber: number;
}

const initialState: IBurgerConstructorState = {
  orderName: "",
  orderNumber: 0,
};

export const constructorSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getOrderData(state, action: PayloadAction<IOrderResponse>) {
      state.orderName = action.payload.name;
      state.orderNumber = action.payload.order.number;
    },
  },
});

export const constructorActions = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
