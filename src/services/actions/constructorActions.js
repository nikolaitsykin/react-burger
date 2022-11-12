import { fetchPost } from "../../utils/fetchRequests";
import { _ORDER_URL } from "../../utils/constants";
import { RESET_CONSTRUCTOR } from "./ingredientsActions";

export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";
export const MAKE_ORDER = "MAKE_ORDER";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

export function orderData(orderData) {
  return function (dispatch) {
    dispatch({ type: MAKE_ORDER });
    fetchPost(_ORDER_URL, orderData)
      .then((data) => {
        dispatch({ type: MAKE_ORDER_SUCCESS, payload: data });
        dispatch({ type: OPEN_ORDER_MODAL });
        dispatch({ type: RESET_CONSTRUCTOR });
      })
      .catch(() => dispatch({ type: MAKE_ORDER_FAILED }));
  };
}
