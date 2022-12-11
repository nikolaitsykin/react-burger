import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import HomePage from "../../pages/home/home";
import IngredientPage from "../../pages/ingredients/ingredients";
import LoginPage from "../../pages/login/login";
import OrdersPage from "../../pages/orders/orders";
import PageNotFound404 from "../../pages/page-not-found-404/page-not-found-404";
import ProfilePage from "../../pages/profile/profile";
import RegisterPage from "../../pages/register/register";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import { getIngredients } from "../../services/reducers/ingredients";
import {
  _FORGOT_PASSWORD_PATH,
  _INGREDIENTS_ID_PATH,
  _LOGIN_PATH,
  _ORDERS_PATH,
  _PROFILE_PATH,
  _REGISTER_PATH,
  _RESET_PASSWORD_PATH,
  _ROOT_PATH,
} from "../../utils/constants";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const AppRouter = () => {
  //   const history = useHistory();
  //   const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <Switch>
      <Route path={_ROOT_PATH} exact component={HomePage} />
      <Route path={_LOGIN_PATH} exact component={LoginPage} />
      <Route path={_REGISTER_PATH} exact component={RegisterPage} />
      <Route
        path={_FORGOT_PASSWORD_PATH}
        exact
        component={ForgotPasswordPage}
      />
      <Route path={_RESET_PASSWORD_PATH} exact component={ResetPasswordPage} />
      <ProtectedRoute path={_PROFILE_PATH} exact component={ProfilePage} />
      <ProtectedRoute path={_ORDERS_PATH} exact component={OrdersPage} />
      <Route path={_INGREDIENTS_ID_PATH} exact component={IngredientPage} />
      <Route path="*" component={PageNotFound404} />
    </Switch>
  );
};

export default AppRouter;
