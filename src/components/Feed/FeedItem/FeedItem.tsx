import {
  CurrencyIcon,
  FormattedDate
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { ILocationState } from "../../../services/types/locationTypes";
import { IOrderProps } from "../../../services/types/orderTypes";
import { _ORDERS_PATH } from "../../../utils/constants";
import classes from "./FeedItem.module.css";

export const FeedItem = ({ order }: IOrderProps) => {
  const location = useLocation<ILocationState>();
  const { ingredientItems } = useAppSelector((state) => state.ingredients);
  let total = 0;

  ingredientItems.forEach((ingredient) => {
    if (order.ingredients.indexOf(ingredient._id) >= 0) {
      let index = order.ingredients.indexOf(ingredient._id);
      let indices = [];
      while (index !== -1) {
        indices.push(index);
        index = order.ingredients.indexOf(ingredient._id, index + 1);
      }
      if (ingredient.type === "bun") {
        total += ingredient.price * 2;
      } else {
        total += +ingredient.price * indices.length;
      }
    }
    return null;
  });

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${order._id}`,
        state: { background: location, total: total },
      }}
      className={classes.text_link}
    >
      <div className={`${classes.item_container} p-5 mb-4`}>
        <div className={`${classes.top} mb-4`}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </div>
        <div className="mb-2">
          <p className="text text_type_main-medium">
            {order.name.length >= 80
              ? `${order.name.substring(0, 80)}...`
              : order.name}
          </p>
        </div>
        {location.pathname === _ORDERS_PATH && (
          <p
            className={`${
              order.status === "done" && "text_color_success"
            } text text_type_main-default`}
          >
            {order.status === "created" && "Created"}
            {order.status === "pending" && "Preparing"}
            {order.status === "done" && "Done"}
          </p>
        )}
        <div className={`${classes.main} mt-2`}>
          <div className={classes.list}>
            {order &&
              ingredientItems &&
              order.ingredients.map((dataId, index) => {
                const findIds = ingredientItems.find(
                  (ingredient) => ingredient._id === dataId
                );
                if (index < 5) {
                  return (
                    <div key={index} className={classes.element}>
                      <img
                        src={`${findIds?.image_mobile}`}
                        alt={`${findIds?.name}`}
                      />
                    </div>
                  );
                }
                if (index === 5) {
                  return (
                    <div key={index} className={classes.element}>
                      <img
                        src={`${findIds?.image_mobile}`}
                        alt={`${findIds?.name}`}
                      />
                      <p className="text text_type_main-default">
                        +{order.ingredients.length - 5}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
          </div>
          <div className={classes.price}>
            <p className="text text_type_digits-default mr-2">{total}</p>
            <CurrencyIcon type={"primary"} />
          </div>
        </div>
      </div>
    </Link>
  );
};
