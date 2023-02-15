import { useDispatch } from "react-redux";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import { authActions } from "../store/auth.slice";
import { constructorActions } from "../store/constructor.slice";
import { ingredientsActions } from "../store/ingredients.slice";
import { modalActions } from "../store/modal.slice";

const actions = {
  ...ingredientsActions,
  ...constructorActions,
  ...modalActions,
  ...authActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
