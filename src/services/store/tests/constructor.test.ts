import { AnyAction } from "redux";
import {
  constructorActions,
  constructorReducer,
  initialState,
} from "../reducers/constructor.slice";

const { getOrderData, openOrderModal, closeOrderModal, resetOrderModal } =
  constructorActions;
const orderMock = {
  success: true,
  name: "Order name",
  order: { number: 123 },
};

describe("RTK burget constructor store", () => {
  it("Initial state should be returned", () => {
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

    expect(result).toEqual({
      ...initialState,
      orderModalIsOpened: false,
    });
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
