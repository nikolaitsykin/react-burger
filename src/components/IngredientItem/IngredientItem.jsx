import React from "react";
import { useDrag } from "react-dnd";
import classes from "./IngredientItem.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../utils/constants";
import { useDispatch } from "react-redux";
import {
  OPEN_INGREDIENT_ITEMS_MODAL,
  SELECT_INGREDIENT_ITEM,
} from "../../services/actions/ingredientsActions";

const IngredientItem = ({ item }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({ type: SELECT_INGREDIENT_ITEM, item: item });
    dispatch({ type: OPEN_INGREDIENT_ITEMS_MODAL });
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  const onDrop = (e) => {
    e.preventDefault();
  };

  return (
    !isDrag && (
      <>
        <div
          className={classes.container}
          onClick={openModal}
          ref={dragRef}
          onDrop={onDrop}
        >
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
      </>
    )
  );
};

IngredientItem.propTypes = {
  item: ingredientsPropTypes.isRequired,
  count: PropTypes.number,
};

export default IngredientItem;
