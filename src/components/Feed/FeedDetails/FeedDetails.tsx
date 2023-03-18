import {
  CurrencyIcon,
  FormattedDate
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { FeedDetailsItem } from "../FeedDetailsItem/FeedDetailsItem";
import classes from "./FeedDetails.module.css";

export const FeedDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredientItems } = useAppSelector((state) => state.ingredients);
  const { orders } = useAppSelector((state) => state.ws.message);

  const order =
    orders && orders.find((order: { _id: string }) => order._id === id);

  let total = 0;
  ingredientItems.forEach((ingredient) => {
    if (order && order.ingredients.indexOf(ingredient._id) >= 0) {
      let ingredientIndex = order.ingredients.indexOf(ingredient._id);
      let indices = [];
      while (ingredientIndex !== -1) {
        indices.push(ingredientIndex);
        ingredientIndex = order.ingredients.indexOf(
          ingredient._id,
          ingredientIndex + 1
        );
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
    <div className={classes.container}>
      <div className={classes.order_number}>
        <p className="text text_type_digits-default mb-10">
          #{order && order.number}
        </p>
      </div>
      <div className={classes.order_name}>
        <p className="text text_type_main-medium mb-3">{order && order.name}</p>
      </div>
      <div className={classes.order_status}>
        <p
          className={`${
            order && order.status === "done" && "text_color_success"
          } text text_type_main-default mb-15`}
        >
          {order && order.status === "created" && "Created"}
          {order && order.status === "pending" && "Preparing"}
          {order && order.status === "done" && "Done"}
        </p>
      </div>
      <p className="text text_type_main-medium mb-6">Ingredients:</p>
      <ul className={`${classes.list} mb-10 custom-scroll`}>
        {ingredientItems.map((ingredient, index) => {
          if (order && order.ingredients.indexOf(ingredient._id) >= 0) {
            let ingredientIndex = order.ingredients.indexOf(ingredient._id);
            let indices = [];
            while (ingredientIndex !== -1) {
              indices.push(ingredientIndex);
              ingredientIndex = order.ingredients.indexOf(
                ingredient._id,
                ingredientIndex + 1
              );
            }
            if (ingredient.type === "bun") {
              return (
                <FeedDetailsItem key={index} item={ingredient} count={2} />
              );
            } else {
              return (
                <FeedDetailsItem
                  key={index}
                  item={ingredient}
                  count={indices.length}
                />
              );
            }
          }
          return null;
        })}
      </ul>
      <footer className={classes.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {order && <FormattedDate date={new Date(order.createdAt)} />}
        </p>
        <div className={classes.total}>
          <p className="text text_type_digits-default mr-2">{total}</p>
          <CurrencyIcon type={"primary"} />
        </div>
      </footer>
    </div>
  );
};
