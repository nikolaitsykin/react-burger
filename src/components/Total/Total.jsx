import React, { useMemo } from "react";
import classes from "./Total.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { orderData } from "../../services/actions/constructorActions";

export const Total = () => {
  const dispatch = useDispatch();

  const { selectedIngredients, selectedBun, total } = useSelector(
    (state) => state.ingredientItems
  );

  const data = useMemo(() => {
    return (
      selectedIngredients &&
      selectedBun && [
        ...selectedIngredients.map((item) => item._id),
        selectedBun._id,
      ]
    );
  }, [selectedIngredients, selectedBun]);

  return (
    <div className={classes.container}>
      <p className="text text_type_digits-medium pl-3">{total}</p>
      <div className={classes.icon}>
        <CurrencyIcon type={"primary"} />
      </div>
      <Button
        htmlType={"submit"}
        type="primary"
        size="large"
        onClick={() => dispatch(orderData(data))}
      >
        Proceed to checkout
      </Button>
    </div>
  );
};

export default Total;
