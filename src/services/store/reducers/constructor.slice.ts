import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderResponse } from "../../types/orderTypes";

interface IBurgerConstructorState {
  orderName: string;
  orderNumber: number;
  orderModalIsOpened: boolean;
  requestModalIsOpened: boolean;
}

export const initialState: IBurgerConstructorState = {
  orderName: "",
  orderNumber: 0,
  orderModalIsOpened: false,
  requestModalIsOpened: false,
};

export const constructorSlice = createSlice({
  name: "constructor",
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
    resetOrderModal(state) {
      state.orderName = "";
      state.orderNumber = 0;
    },

    openRequestModal(state: IBurgerConstructorState) {
      state.requestModalIsOpened = true;
    },
    closeRequestModal(state: IBurgerConstructorState) {
      state.requestModalIsOpened = false;
    },
  },
});

export const constructorActions = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
