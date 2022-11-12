import {
  MAKE_ORDER,
  MAKE_ORDER_FAILED,
  MAKE_ORDER_SUCCESS,
  CLOSE_ORDER_MODAL,
  OPEN_ORDER_MODAL,
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
        isOrderModalOpen: true,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpen: false,
      };
    }
    case MAKE_ORDER: {
      return {
        ...state,
        isRequest: true,
        isRequestError: false,
      };
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        isRequest: false,
        orderName: action.payload.name,
        orderNumber: action.payload.order.number,
      };
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        isRequest: false,
        isRequestError: true,
      };
    }
    default:
      return state;
  }
};
