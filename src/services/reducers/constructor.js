import {
  CLOSE_ORDER_MODAL, MAKE_ORDER,
  MAKE_ORDER_FAILED,
  MAKE_ORDER_SUCCESS, OPEN_ORDER_MODAL
} from "../actions/constructorActions";

const initialState = {
  isRequested: false,
  isRequestedError: false,
  isOrderModalOpened: false,
  orderName: null,
  orderNumber: null,
};

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpened: true,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpened: false,
      };
    }
    case MAKE_ORDER: {
      return {
        ...state,
        isRequested: true,
        isRequestedError: false,
      };
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        isRequested: false,
        orderName: action.payload.name,
        orderNumber: action.payload.order.number,
      };
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        isRequested: false,
        isRequestededError: true,
        orderNumber: null,
        orderName: null,
      };
    }
    default:
      return state;
  }
};
