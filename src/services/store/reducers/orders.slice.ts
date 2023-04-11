import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderRequest } from "../../types/orderTypes";

export const initialState: IOrderRequest = {
  orders: [],
  total: 0,
  totalToday: 0,
  success: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders(state, action: PayloadAction<IOrderRequest>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.success = true;
    },
  },
});

export const ordersActions = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;