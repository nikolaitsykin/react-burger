import { IIngredient } from "../../types/ingredientsTypes";
import {
  ingredientsActions,
  ingredientsReducer,
  initialState
} from "../reducers/ingredients.slice";

const {
  getIngredients,
  getIngredientsFailed,
  chooseTab,
  addIngredient,
  addBun,
  removeIngredient,
  getTotalPrice,
  updateSelectedIngredients,
  resetConstructor,
} = ingredientsActions;

const dataMock: IIngredient[] = [
  {
    calories: 99,
    carbohydrates: 42,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    name: "Соус традиционный галактический",
    price: 15,
    proteins: 42,
    type: "sauce",
    __v: 0,
    _id: "60d3b41abdacab0026a733ce",
    index: 0,
    count: 0,
    uid: "",
  },
  {
    calories: 420,
    carbohydrates: 33,
    fat: 244,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    name: "Мясо бессмертных моллюсков Protostomia",
    price: 1337,
    proteins: 433,
    type: "main",
    __v: 0,
    _id: "60d3b41abdacab0026a733c9",
    count: 0,
    index: 0,
    uid: "",
  },
  {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
    count: 0,
    uid: "",
    index: 0,
  },
  {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
    count: 0,
    uid: "",
    index: 0,
  },
];

describe("RTK ingredients store", () => {
  it("Ingredients should be added to store", () => {
    const result = ingredientsReducer(initialState, getIngredients(dataMock));

    expect(result).toEqual({
      ...initialState,
      ingredientItems: dataMock,
      sauce: [dataMock[0]],
      main: [dataMock[1]],
      bun: [dataMock[2], dataMock[3]],
      isRequested: false,
    });
  });
  it("Tab should to be chosen", () => {
    const result = ingredientsReducer(initialState, chooseTab("bun"));

    expect(result).toEqual({
      ...initialState,
      currentTab: "bun",
    });
  });
  it("Should add selected bun", () => {
    let state: typeof initialState = {
      ...initialState,
      bun: [dataMock[2], dataMock[3]],
    };

    const result = ingredientsReducer(state, addBun(dataMock[2]));
    expect(result).toEqual({
      ...state,
      bun: [{ ...dataMock[2], count: 2 }, dataMock[3]],
      selectedBun: dataMock[2],
    });
  });
  it("Should add selected ingredient", () => {
    let state: typeof initialState = {
      ...initialState,
      main: [{ ...dataMock[1], count: 1 }],
    };
    expect(
      ingredientsReducer(state, addIngredient({ ...dataMock[1], count: 1 }))
    ).toEqual({
      ...state,
      main: [{ ...dataMock[1], count: 2 }],
      selectedIngredients: [{ ...dataMock[1], count: 1 }],
    });
  });
  it("Should remove selected ingredient", () => {
    let state: typeof initialState = {
      ...initialState,
      main: [{ ...dataMock[1], count: 2 }],
      selectedIngredients: [
        { ...dataMock[1], count: 2, uid: "7Bwr2128" },
        { ...dataMock[1], count: 1, uid: "7Bwr6439" },
      ],
    };
    expect(
      ingredientsReducer(
        state,
        removeIngredient({ ...dataMock[1], count: 1, uid: "7Bwr2128" })
      )
    ).toEqual({
      ...state,
      main: [{ ...dataMock[1], count: 1 }],
      selectedIngredients: [{ ...dataMock[1], count: 1, uid: "7Bwr6439" }],
    });
  });
  it("Should cause error", () => {
    const result = ingredientsReducer(initialState, getIngredientsFailed);

    expect(result).toEqual({
      ...initialState,
      isRequested: false,
      isRequestedError: true,
    });
  });

  it("Constructor should reset", () => {
    const result = ingredientsReducer(initialState, resetConstructor);

    expect(result).toEqual(initialState);
  });

  it("Get total price should got", () => {
    let state: typeof initialState = {
      ...initialState,
      selectedIngredients: [dataMock[1]],
      selectedBun: dataMock[2],
      total: 0,
    };
    const result = ingredientsReducer(state, getTotalPrice);

    expect(result).toEqual({
      ...state,
      total: 3847,
    });
  });
  it("Should update selected ingredients", () => {
    let state: typeof initialState = {
      ...initialState,
      selectedIngredients: [dataMock[1], dataMock[0]],
    };

    const result = ingredientsReducer(
      state,
      updateSelectedIngredients([dataMock[0], dataMock[1]])
    );
    expect(result).toEqual({
      ...state,
      selectedIngredients: [dataMock[0], dataMock[1]],
    });
  });
});
