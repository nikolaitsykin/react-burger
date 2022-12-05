import { MODAL_CLOSE, MODAL_OPEN } from "../actions/modal";

const initialState = {
  modalIsOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN: {
      return {
        ...state,
        modalIsOpen: true,
      };
    }
    case MODAL_CLOSE: {
      window.history.replaceState(null, null, "/");
      return {
        ...state,
        modalIsOpen: false,
      };
    }
    default:
      return state;
  }
};
