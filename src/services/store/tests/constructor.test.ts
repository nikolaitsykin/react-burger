import {
  constructorReducer,
  initialState,
  constructorActions,
} from "../reducers/constructor.slice";
import { AnyAction } from "redux";

const { getOrderData, resetOrderModal, openOrderModal, closeOrderModal } =
  constructorActions;

const orderMock = {
  name: "Order name",
  success: true,
  order: { number: 123 },
};

describe("RTK burger constructor store", () => {
  it("Should return initial state", () => {
    const result = constructorReducer(undefined, {} as AnyAction);
    expect(result).toEqual(initialState);
  });

  it("Should reset order modal", () => {
    const result = constructorReducer(initialState, resetOrderModal);
    expect(result).toEqual(initialState);
  });

  it("Should open order modal", () => {
    const result = constructorReducer(initialState, openOrderModal);
    expect(result).toEqual({
      ...initialState,
      orderModalIsOpened: true,
    });
  });

  it("Should close order modal", () => {
    const result = constructorReducer(initialState, closeOrderModal);
    expect(result).toEqual(initialState);
  });

  it("Should fill order data", () => {
    const result = constructorReducer(initialState, getOrderData(orderMock));
    expect(result).toEqual({
      ...initialState,
      orderName: "Order name",
      orderNumber: 123,
    });
  });
});
