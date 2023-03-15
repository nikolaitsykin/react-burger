import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { _WS_URL } from "../../../utils/constants";
// import { getCookie } from "../../../utils/cookie";
import { IOrderRequest } from "../../types/orderTypes";
import { IWsState } from "../../types/socketTypes";

const initialState: IWsState = {
  status: "",
  connectionError: "",
  message: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    connecting(state) {
      state.status = "Connecting";
    },
    open(state) {
      state.status = "Online";
    },
    close(state) {
      state.status = "Offline";
    },
    error(state, action: PayloadAction<string>) {
      state.connectionError = action.payload;
    },
    onMessage(state, action: PayloadAction<IOrderRequest>) {
      state.message = action.payload;
    },
  },
});

export const getOrders = () => {
  return { wsUrl: `${_WS_URL}/all` };
};

export const getPersonalOrders = (accessToken: string | undefined) => {
  return { wsUrl: `${_WS_URL}?token=${accessToken}` };
};

export const wsActions = wsSlice.actions;
export const wsReducer = wsSlice.reducer;
