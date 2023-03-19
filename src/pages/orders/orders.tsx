import { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { FeedList } from "../../components/Feed/FeedList/FeedList";
import { ProfileSideBar } from "../../components/ProfileSideBar/ProfileSideBar";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { useGetIngredientsQuery } from "../../services/store/api";
import { getPersonalOrders } from "../../services/store/reducers/ws.slice";
import { ILocationState } from "../../services/types/locationTypes";
import { _LOGIN_PATH } from "../../utils/constants";
import classes from "../orders/orders.module.css";

export const OrdersPage = () => {
  const { open, close } = useActions();
  const location = useLocation<ILocationState>();
  const { isAuth } = useAppSelector((state) => state.auth);

  const { getIngredients, getIngredientsFailed } = useActions();

  const {
    isError: isIngredientsError,
    data: ingredients,
    isSuccess: isIngredientsGetSuccess,
  } = useGetIngredientsQuery("");

  useEffect(() => {
    if (isIngredientsGetSuccess) {
      getIngredients(ingredients);
    }
    if (isIngredientsError) {
      getIngredientsFailed();
    }
  }, [
    ingredients,
    isIngredientsGetSuccess,
    isIngredientsError,
    getIngredients,
    getIngredientsFailed,
  ]);

  useEffect(() => {
    open(getPersonalOrders());

    return () => {
      close();
    };
  }, []);

  if (isAuth) {
    return (
      <div className={classes.orders_container}>
        <ProfileSideBar />
        <FeedList />
      </div>
    );
  }
  return <Redirect to={{ pathname: _LOGIN_PATH, state: { from: location } }} />;
};
