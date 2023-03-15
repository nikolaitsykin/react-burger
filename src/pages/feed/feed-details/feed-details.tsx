import { useEffect } from "react";
import { FeedDetails } from "../../../components/Feed/FeedDetails/FeedDetails";
import { useActions } from "../../../hooks/actions";
import { getOrders } from "../../../services/store/reducers/ws.slice";

export const FeedDetailsPage = () => {
  const { open, close } = useActions();

  useEffect(() => {
    open(getOrders());

    return () => {
      close();
    };
  });
  return <FeedDetails />;
};
