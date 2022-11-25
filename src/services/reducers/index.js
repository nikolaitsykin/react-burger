import { combineReducers } from "redux";
import { ingredientItems } from "./ingredients";
import { burgerConstructor } from "./constructor";

export const rootReducer = combineReducers({
  ingredientItems,
  burgerConstructor,
});
