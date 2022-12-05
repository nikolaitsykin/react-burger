import {
  Counter,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { ingredientsPropTypes } from "../../utils/constants";
import classes from "./IngredientItem.module.css";

const IngredientItem = ({ item }) => {
  const location = useLocation();

  const ingredientId = item["_id"];

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  return (
    !isDrag && (
      <Link className={classes.ingredient_link}
        to={{
          pathname: `/ingredients/${ingredientId}`,
          state: { background: location },
        }}
        key={ingredientId}
      >
        <div className={classes.container} ref={dragRef}>
          <div className={classes.top}>
            {item.count > 0 && (
              <Counter
                className={classes.counter}
                count={item.count}
                size="default"
              />
            )}
            <img src={item.image} alt={item.name} />
          </div>
          <div className={classes.body}>
            <div className={classes.price}>
              <p className="text text_type_digits-default pr-2">{item.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <div className={classes.name}>
              <p className="text text_type_main-default pt-13">{item.name}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  );
};

IngredientItem.propTypes = {
  item: ingredientsPropTypes.isRequired,
  count: PropTypes.number,
};

export default IngredientItem;
