import {
  Counter,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Identifier } from "dnd-core";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import {
  IIngredient,
  IngredientItemProps
} from "../../../services/types/ingredientsTypes";
import { ILocationState } from "../../../services/types/locationTypes";
import { _INGREDIENTS_PATH } from "../../../utils/constants";
import classes from "./IngredientItem.module.css";

export const IngredientItem = ({ item }: IngredientItemProps) => {
  const location = useLocation<ILocationState>();

  const ingredientId = item["_id"];

  const [{ isDrag }, dragRef] = useDrag<
    IIngredient,
    void,
    { isDrag: Identifier | null }
  >({
    type: "ingredient",
    item: item,
  });

  if (!isDrag) {
    return (
      <Link
        className={classes.ingredient_link}
        to={{
          pathname: `${_INGREDIENTS_PATH}${ingredientId}`,
          state: { background: location },
        }}
        key={ingredientId}
      >
        <div className={classes.container} ref={dragRef}>
          <div className={classes.top}>
            {item.count > 0 && <Counter count={item.count} size="default" />}
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
    );
  } else {
    return <></>;
  }
};
