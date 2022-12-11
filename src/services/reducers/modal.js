import { _ROOT_PATH } from "../../utils/constants";
import { MODAL_CLOSE, MODAL_OPEN } from "../actions/modal";

const initialState = {
  modalIsOpened: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN: {
      return {
        ...state,
        modalIsOpened: true,
      };
    }
    case MODAL_CLOSE: {
      window.history.replaceState(null, null, _ROOT_PATH);
      return {
        ...state,
        modalIsOpened: false,
      };
    }
    default:
      return state;
  }
};
