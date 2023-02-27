import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../models/models";
import { _BUN, _MAIN, _SAUCE } from "../utils/constants";

export const emptyIngredient: IIngredient = {
  _id: "",
  name: "",
  type: "",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: "",
  image_mobile: "",
  image_large: "",
  __v: 0,
  count: 0,
  uid: "",
  index: 0,
};

interface IngredientsState {
  items: IIngredient[];
  bun: IIngredient[];
  sauce: IIngredient[];
  main: IIngredient[];
  isRequested: boolean;
  isRequestedError: boolean;
  selectedIngredient: IIngredient;
  selectedIngredients: IIngredient[];
  selectedBun: IIngredient;
  currentTab: string;
  total: number;
}

const initialState: IngredientsState = {
  items: [],
  bun: [],
  sauce: [],
  main: [],
  isRequested: true,
  isRequestedError: false,
  selectedIngredient: emptyIngredient,
  selectedIngredients: [],
  selectedBun: emptyIngredient,
  currentTab: _BUN,
  total: 0,
};

type IngredientTypes = "bun" | "sauce" | "main";

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getIngredients(state, action: PayloadAction<IIngredient[]>) {
      state.items = action.payload.map((items) => {
        return {...items, count: 0, uid: "" }
      })
      state.bun = action.payload
        .filter((item) => {
          const type = item.type;
          return type === _BUN;
        })
        .map((item) => {
          return { ...item, count: 0, uid: "" };
        });
      state.sauce = action.payload
        .filter((item) => {
          const type = item.type;
          return type === _SAUCE;
        })
        .map((item) => {
          return { ...item, count: 0, uid: "" };
        });
      state.main = action.payload
        .filter((item) => {
          const type = item.type;
          return type === _MAIN;
        })
        .map((item) => {
          return { ...item, count: 0, uid: "" };
        });
      state.isRequested = false;
    },
    getIngredientsFailed(state) {
      state.isRequested = false;
      state.isRequestedError = true;
    },
    chooseTab(state, action: PayloadAction<string>) {
      state.currentTab = action.payload;
    },
    addIngredient(state, action: PayloadAction<IIngredient>) {
      state.selectedIngredients = [
        ...state.selectedIngredients,
        {
          ...action.payload,
          count: action.payload.count++,
        },
      ];
      state[action.payload.type as IngredientTypes] = state[
        action.payload.type as IngredientTypes
      ].map((item: IIngredient) => {
        if (item._id === action.payload._id) {
          return { ...item, count: item.count + 1 };
        } else {
          return item;
        }
      });
    },
    addBun(state, action: PayloadAction<IIngredient>) {
      state.selectedBun = action.payload;
      state.bun = state.bun.map((item: IIngredient) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            count: 2,
          };
        } else {
          return {
            ...item,
            count: 0,
          };
        }
      });
    },
    removeIngredient(state, action: PayloadAction<IIngredient>) {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item: IIngredient) => item.uid !== action.payload.uid
      );
      state[action.payload.type as IngredientTypes] = state[
        action.payload.type as IngredientTypes
      ].map((item: IIngredient) => {
        if (item._id === action.payload._id) {
          return { ...item, count: --item.count };
        } else {
          return item;
        }
      });
    },
    getTotalPrice(state) {
      state.total =
        state.selectedIngredients &&
        state.selectedIngredients.reduce(
          (a, b) => a + b.price,
          state.selectedBun.price * 2 || 0
        );
    },
    updateSelectedIngredients(state, action: PayloadAction<IIngredient[]>) {
      state.selectedIngredients = action.payload;
    },
    resetConstructor(state) {
      state.selectedIngredients = [];
      state.selectedBun = emptyIngredient;
      state.total = 0;
      state.bun = state.bun.map((item) => ({ ...item, count: 0 }));
      state.sauce = state.sauce.map((item) => ({ ...item, count: 0 }));
      state.main = state.main.map((item) => ({ ...item, count: 0 }));
    },
  },
});

export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
