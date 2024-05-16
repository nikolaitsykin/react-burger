import { useAppSelector } from "../../../hooks/redux";
import classes from "./FeedHistory.module.css";

export const FeedHistory = () => {
  const { total, totalToday, orders } = useAppSelector(
    (state) => state.ws.message
  );


  return (
    <section className={classes.history}>
      <div className={`${classes.orders_wrap} mb-15`}>
        <div className={`${classes.orders_ready} ${classes.orders}`}>
          <p className="text text_type_main-medium pb-6">Ready:</p>
          <div className={classes.orders_inner}>
            {orders &&
              orders.map(
                (order, index, ) =>
                  order.status === "done" &&
                  index < 14 && (
                    <p
                      className="text text_type_digits-default text_color_success mb-2"
                      key={order._id}
                    >
                      {order.number}
                    </p>
                  )
              )}
          </div>
        </div>
        <div className={`${classes.orders_ready} ${classes.orders}`}>
          <p className="text text_type_main-medium pb-6">In progres:</p>
          <div className={classes.orders_inner}>
            {orders &&
              orders.map(
                (order, index) =>
                  order.status === "pending" &&
                  index < 14 && (
                    <p
                      className="text text_type_digits-default text_color_progress mb-2"
                      key={order._id}
                    >
                      {order.number}
                    </p>
                  )
              )}
          </div>
        </div>
      </div>
      <div className={`${classes.orders_total} mb-15`}>
        <p className="text text_type_main-medium">Total completed:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>

      <div className={classes.orders_today}>
        <p className="text text_type_main-medium">Today completed:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </section>
  );
};
