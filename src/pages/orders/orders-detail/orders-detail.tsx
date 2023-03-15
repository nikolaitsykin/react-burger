import { useEffect } from "react";
import { FeedDetails } from "../../../components/Feed/FeedDetails/FeedDetails";
import { useActions } from "../../../hooks/actions";
import { getPersonalOrders } from "../../../services/store/reducers/ws.slice";
import { getCookie } from "../../../utils/cookie";

export const OrderDetailsPage = () => {
  const { open, close } = useActions();
  const accessToken = getCookie("token");

  useEffect(() => {
    open(getPersonalOrders(accessToken));

    return () => {
      close();
    };
  });
  return <FeedDetails />;
};
