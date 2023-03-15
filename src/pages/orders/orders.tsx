import { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { FeedList } from "../../components/Feed/FeedList/FeedList";
import { ProfileSideBar } from "../../components/ProfileSideBar/ProfileSideBar";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { getPersonalOrders } from "../../services/store/reducers/ws.slice";
import { ILocationState } from "../../services/types/locationTypes";
import { _LOGIN_PATH } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import classes from "../orders/orders.module.css";

export const OrdersPage = () => {
  const { open, close } = useActions();
  const location = useLocation<ILocationState>();
  const { isAuth } = useAppSelector((state) => state.auth);
  const accessToken = getCookie("token");

  useEffect(() => {
    open(getPersonalOrders(accessToken));

    return () => {
      close();
    };
  });
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
