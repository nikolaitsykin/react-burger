import { Middleware, MiddlewareAPI } from "redux";
import { TWsActions } from "../../types/socketTypes";
import { AppDispatch, RootState } from "../store";
export const WS_STATE_OPENED = 1;
export let socket: WebSocket | null = null;

export const socketMiddleware =
  (wsActions: TWsActions): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    return (next) => {
      return (action) => {
        const { onMessage, open, close } = wsActions;

        if (action.type === open.type) {
          if (socket) return;
          socket = new WebSocket(action.payload.wsUrl);
        }

        if (socket) {
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            store.dispatch(onMessage(data));
          };

          if (
            action.type === close.type &&
            socket.readyState === WS_STATE_OPENED
          ) {
            socket.close();
            socket = null;
          }
        }
        return next(action);
      };
    };
  };
