import {
  initialState,
  modalActions,
  modalReducer
} from "../reducers/modal.slice";
const { openModal, closeModal } = modalActions;

describe("RTK modal store", () => {
  test("Modal should open", () => {
    expect(modalReducer(initialState, openModal)).toEqual({
      ...initialState,
      modalIsOpened: true,
    });
  });

  test("Modal should close", () => {
    expect(modalReducer(initialState, closeModal)).toEqual({
      ...initialState,
      modalIsOpened: false,
    });
  });
});
