import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import { authActions } from "../services/store/reducers/auth.slice";
import { constructorActions } from "../services/store/reducers/constructor.slice";
import { ingredientsActions } from "../services/store/reducers/ingredients.slice";
import { modalActions } from "../services/store/reducers/modal.slice";
import { useAppDispatch } from "../services/store/store";
import { wsActions } from "../services/store/reducers/ws.slice";


const actions = {
  ...ingredientsActions,
  ...constructorActions,
  ...modalActions,
  ...authActions,
  ...wsActions
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};
