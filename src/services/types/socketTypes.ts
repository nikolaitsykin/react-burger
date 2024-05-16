import { wsActions } from "../store/reducers/ws.slice";
import { IOrderRequest } from "./orderTypes";

export interface IWsState {
  status: string;
  connectionError: string;
  message: IOrderRequest;
}

export type TWsActions = typeof wsActions;
