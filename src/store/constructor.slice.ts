import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderResponse } from "../models/models";

interface IBurgerConstructorState {
  orderName: string;
  orderNumber: number;
  orderModalIsOpened: boolean;
}

const initialState: IBurgerConstructorState = {
  orderName: "",
  orderNumber: 0,
  orderModalIsOpened: false,
};

export const constructorSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getOrderData(state, action: PayloadAction<IOrderResponse>) {
      state.orderName = action.payload.name;
      state.orderNumber = action.payload.order.number;
    },
    openOrderModal(state: IBurgerConstructorState) {
      state.orderModalIsOpened = true;
    },
    closeOrderModal(state: IBurgerConstructorState) {
      state.orderModalIsOpened = false;
    },
  },
});

export const constructorActions = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
