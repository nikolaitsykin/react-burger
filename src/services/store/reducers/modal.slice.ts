import { createSlice } from "@reduxjs/toolkit";
import { IModalState } from "../../types/modalTypes";

export const initialState: IModalState = {
  modalIsOpened: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state: IModalState) {
      state.modalIsOpened = true;
    },
    closeModal(state: IModalState) {
      state.modalIsOpened = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
