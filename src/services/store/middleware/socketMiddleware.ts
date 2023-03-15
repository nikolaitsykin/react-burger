import { Middleware, MiddlewareAPI } from "redux";
import { TWsActions } from "../../types/socketTypes";
import { AppDispatch, RootState } from "../store";

export const socketMiddleware =
  (wsActions: TWsActions): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => {
      return (action) => {
        const { onMessage, open, close } = wsActions;

        if (action.type === open.type) {
          socket = new WebSocket(action.payload.wsUrl);
        }

        if (socket) {
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            store.dispatch(onMessage(data));
          };

          if (action.type === close.type && socket.readyState === 1) {
            socket.close();
          }
        }
        return next(action);
      };
    };
  };

