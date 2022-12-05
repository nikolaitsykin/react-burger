import { combineReducers } from "redux";
import { burgerConstructor } from "./constructor";
import { ingredientItems } from "./ingredients";
import { userData } from "./auth";
import { modalReducer } from "./modal";


export const rootReducer = combineReducers({
  ingredientItems,
  burgerConstructor,
  userData,
  modalReducer,
});
