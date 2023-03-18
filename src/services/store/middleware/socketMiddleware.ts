import { Middleware, MiddlewareAPI } from "redux";
import { TWsActions } from "../../types/socketTypes";
import { AppDispatch, RootState } from "../store";

export const socketMiddleware =
  (wsActions: TWsActions): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    const WS_STATE_OPEN = 1

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

          if (action.type === close.type && socket.readyState === WS_STATE_OPEN) {
            socket.close();
          }
        }
        return next(action);
      };
    };
  };

