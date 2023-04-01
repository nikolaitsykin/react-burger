import {
  initialState,
  modalActions,
  modalReducer,
} from "../reducers/modal.slice";

const { openModal, closeModal } = modalActions;

describe("RTK modal store", () => {
  it("Modal should open", () => {
    const result = modalReducer(initialState, openModal);
    expect(result).toEqual({
      ...initialState,
      modalIsOpened: true,
    });
  });

  it("Modal should close", () => {
    const result = modalReducer(initialState, closeModal);
    expect(result).toEqual({
      ...initialState,
      modalIsOpened: false,
    });
  });
});
