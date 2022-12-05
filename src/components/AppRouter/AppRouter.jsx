import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientsPage from "../../pages/ingredients/ingredients";
import PageNotFound404 from "../../pages/page-not-found-404/page-not-found-404";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import OrdersPage from "../../pages/orders/orders";
import { getIngredients } from "../../services/reducers/ingredients";
import { useDispatch } from "react-redux";

const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterPage} />
      <Route path="/forgot-password" exact component={ForgotPasswordPage} />
      <Route path="/reset-password" exact component={ResetPasswordPage} />
      <ProtectedRoute path="/profile" exact component={ProfilePage} />
      <ProtectedRoute
        path="/profile/orders"
        exact
        component={OrdersPage}
      />{" "}
      <Route path="/ingredients/:ingredientId" exact component={IngredientsPage} />
      <Route path="*" component={PageNotFound404} />
    </Switch>
  );
};

export default AppRouter;
