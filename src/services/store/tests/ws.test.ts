import { wsActions, wsReducer, initialState } from "./../reducers/ws.slice";
import { AnyAction } from "redux";

const { connecting, open, close, error, onMessage } = wsActions;
const mockData = { success: true, orders: [], total: 123, totalToday: 321 };

describe("wsSlice", () => {
  it("Should return default state", () => {
    const result = wsReducer(undefined, {} as AnyAction);
    expect(result).toEqual(initialState);
  });

  it("Should change status with connecting action", () => {
    const result = wsReducer(initialState, connecting);
    expect(result).toEqual({
      ...initialState,
      status: "Connecting",
    });
  });
  it("Should change status with open action", () => {
    const result = wsReducer(initialState, open);
    expect(result).toEqual({
      ...initialState,
      status: "Online",
    });
  });
  it("Should change status with close action", () => {
    const result = wsReducer(initialState, close);
    expect(result).toEqual({
      ...initialState,
      status: "Offline",
    });
  });
  it("Should change status with error action", () => {
    const result = wsReducer(initialState, error("error"));
    expect(result).toEqual({
      ...initialState,
      connectionError: "error",
    });
  });

  it("Should change data with onMessage action", () => {
    const result = wsReducer(initialState, onMessage(mockData));
    expect(result).toEqual({
      ...initialState,
      message: mockData,
    });
  });
});
