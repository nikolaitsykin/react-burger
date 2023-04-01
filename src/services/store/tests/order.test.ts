import { AnyAction } from "redux";
import {
  ordersActions,
  ordersReducer,
  initialState,
} from "./../reducers/orders.slice";

const { addOrders } = ordersActions;
const mockData = { success: true, orders: [], total: 123, totalToday: 321 };

describe("wsSlice", () => {
  it("Should return default state", () => {
    const result = ordersReducer(undefined, {} as AnyAction);
    expect(result).toEqual(initialState);
  });

  it("Should change status with connecting action", () => {
    const result = ordersReducer(initialState, addOrders(mockData));
    expect(result).toEqual({
      ...initialState,
      orders: [],
      total: 123,
      totalToday: 321,
      success: true,
    });
  });
});
