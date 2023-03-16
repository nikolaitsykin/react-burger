import { useAppSelector } from "../../../hooks/redux";
import { Loader } from "../../Loader/Loader";
import { FeedItem } from "../FeedItem/FeedItem";
import classes from "./FeedList.module.css";

export const FeedList = () => {
  const { orders } = useAppSelector((state) => state.ws.message);

  return (
    <section className={`${classes.orders_list} custom-scroll`}>
      {orders ? (
        orders.map((order) => <FeedItem key={order.number} order={order} />)
      ) : (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
    </section>
  );
};
