import { createSlice } from "@reduxjs/toolkit";

interface IModalState {
  modalIsOpened: boolean;
}

const initialState: IModalState = {
  modalIsOpened: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state: IModalState) {
      state.modalIsOpened = true;
    },
    closeModal(state) {
      state.modalIsOpened = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
