import { useEffect } from "react";
import { FeedDetails } from "../../../components/Feed/FeedDetails/FeedDetails";
import { useActions } from "../../../hooks/actions";
import { getPersonalOrders } from "../../../services/store/reducers/ws.slice";

export const OrderDetailsPage = () => {
  const { open, close } = useActions();

  useEffect(() => {
    open(getPersonalOrders());

    return () => {
      close();
    };
  });
  return <FeedDetails />;
};
