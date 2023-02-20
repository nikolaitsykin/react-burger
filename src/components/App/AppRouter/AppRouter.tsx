import { Location } from "history";
import { Route, Switch, useLocation } from "react-router-dom";
import { ILocationState } from "../../../models/models";
import ForgotPasswordPage from "../../../pages/forms/forgot-password/forgot-password";
import LoginPage from "../../../pages/forms/login/login";
import RegisterPage from "../../../pages/forms/register/register";
import ResetPasswordPage from "../../../pages/forms/reset-password/reset-password";
import HomePage from "../../../pages/home/home";
import IngredientPage from "../../../pages/ingredients/ingredients";
import OrdersPage from "../../../pages/orders/orders";
import PageNotFound404 from "../../../pages/page-not-found-404/page-not-found-404";
import ProfilePage from "../../../pages/profile/profile";
import {
  _FORGOT_PASSWORD_PATH,
  _INGREDIENTS_ID_PATH,
  _LOGIN_PATH,
  _ORDERS_PATH,
  _PROFILE_PATH,
  _REGISTER_PATH,
  _RESET_PASSWORD_PATH,
  _ROOT_PATH,
} from "../../../utils/constants";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

export default function AppRouter() {
  const location = useLocation<ILocationState | Location<any> | any>();

  const background = location.state && location.state.background;

  return (
    <Switch location={background || location}>
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

