import {
  GET_INGREDIENT_ITEMS,
  GET_INGREDIENT_ITEMS_SUCCESS,
  GET_INGREDIENT_ITEMS_FAILED,
  GET_TOTAL_PRICE,
  OPEN_INGREDIENT_ITEMS_MODAL,
  CLOSE_INGREDIENT_ITEMS_MODAL,
  SELECT_INGREDIENT_ITEM,
  CHOOSE_TAB,
  ADD_INGREDIENT_ITEM,
  ADD_BUN_ITEM,
  DECREASE_INGREDIENT_ITEM,
  UPDATE_SELECTED_INGREDIENT_ITEMS,
  RESET_CONSTRUCTOR,
} from "../actions/ingredientsActions";
import { fetchGet } from "../../utils/fetchRequests";
import { _BUN, _MAIN, _SAUCE, _ITEMS_URL } from "../../utils/constants";
import { nanoid } from "nanoid";

const initialState = {
  bun: [],
  sauce: [],
  main: [],
  isRequested: false,
  isRequestedError: false,
  isIngredientModalOpened: false,
  selectedIngredient: {},
  selectedIngredients: [],
  selectedBun: {},
  currentTab: _BUN,
  total: null,
};

export const addIngredient = (dispatch, item) => {
  if (item.type === _BUN) {
    dispatch({ type: ADD_BUN_ITEM, item: item });
    dispatch({ type: GET_TOTAL_PRICE });
  } else {
    item.uid = nanoid(8);
    dispatch({ type: ADD_INGREDIENT_ITEM, item: item });
    dispatch({ type: GET_TOTAL_PRICE });
  }
};

export function getIngredients() {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENT_ITEMS });
    fetchGet(_ITEMS_URL)
      .then(({ data }) => {
        dispatch({
          type: GET_INGREDIENT_ITEMS_SUCCESS,
          payload: data,
        });
      })
      .catch(() => dispatch({ type: GET_INGREDIENT_ITEMS_FAILED }));
  };
}

export const ingredientItems = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_ITEMS: {
      return {
        ...state,
        isRequested: true,
        isRequestedError: false,
      };
    }
    case GET_INGREDIENT_ITEMS_FAILED: {
      return {
        ...state,
        isRequested: false,
        isRequestedError: true,
      };
    }
    case GET_INGREDIENT_ITEMS_SUCCESS: {
      return {
        ...state,
        bun: [
          ...action.payload
            .filter((item) => item.type === _BUN)
            .map((item) => {
              return { ...item, count: null };
            }),
        ],
        sauce: [
          ...action.payload
            .filter((item) => item.type === _SAUCE)
            .map((item) => {
              return { ...item, count: null };
            }),
        ],
        main: [
          ...action.payload
            .filter((item) => item.type === _MAIN)
            .map((item) => {
              return { ...item, count: null };
            }),
        ],
        isRequest: false,
      };
    }
    case GET_TOTAL_PRICE: {
      return {
        ...state,
        total:
          state.selectedIngredients &&
          state.selectedIngredients.reduce(
            (a, b) => a + b.price,
            state.selectedBun.price * 2 || 0
          ),
      };
    }
    case OPEN_INGREDIENT_ITEMS_MODAL: {
      return {
        ...state,
        isIngredientModalOpened: true,
      };
    }
    case CLOSE_INGREDIENT_ITEMS_MODAL: {
      return {
        ...state,
        isIngredientModalOpened: false,
      };
    }
    case SELECT_INGREDIENT_ITEM: {
      return {
        ...state,
        selectedIngredient: action.item,
      };
    }
    case CHOOSE_TAB: {
      return {
        ...state,
        currentTab: action.value,
      };
    }
    case ADD_INGREDIENT_ITEM: {
      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients,
          { ...action.item, uid: nanoid(8), count: action.item.count++ },
        ],
      };
    }
    case ADD_BUN_ITEM: {
      return {
        ...state,
        selectedBun: action.item,
        bun: state.bun.map((item) => {
          if (item === action.item) {
            return {
              ...item,
              count: 2,
            };
          } else {
            return {
              ...item,
              count: null,
            };
          }
        }),
      };
    }
    case DECREASE_INGREDIENT_ITEM: {
      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients.filter(
            (item) => item.uid !== action.item.uid
          ),
        ],
        [action.item.type]: [
          ...state[action.item.type].map((item) => {
            if (item._id === action.item._id) {
              return { ...item, count: --item.count };
            } else {
              return item;
            }
          }),
        ],
      };
    }
    default: {
      return state;
    }
    case UPDATE_SELECTED_INGREDIENT_ITEMS: {
      return {
        ...state,
        selectedIngredients: [...action.payload],
      };
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        selectedIngredients: [],
        selectedBun: {},
        bun: [
          ...state.bun.map((item) => {
            return { ...item, count: 0 };
          }),
        ],
        sauce: [
          ...state.sauce.map((item) => {
            return { ...item, count: 0 };
          }),
        ],
        main: [
          ...state.main.map((item) => {
            return { ...item, count: 0 };
          }),
        ],
      };
    }
  }
};
