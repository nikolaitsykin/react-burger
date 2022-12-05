import {
  Button,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { orderData } from "../../services/actions/constructorActions";
import classes from "./Total.module.css";

export const Total = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth } = useSelector((state) => state.userData);

  const { selectedIngredients, selectedBun, total } = useSelector(
    (state) => state.ingredientItems
  );

  const dataIds = useMemo(() => {
    return (
      selectedIngredients &&
      selectedBun && [
        ...selectedIngredients.map((item) => item._id),
        selectedBun._id,
      ]
    );
  }, [selectedIngredients, selectedBun]);

  const handleOrder = () => {
    if (isAuth) {
      if (selectedBun._id && selectedIngredients.length) {
        dispatch(orderData(dataIds));
      }
    } else {
      history.replace("/login");
    }
  };

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
        onClick={() => handleOrder()}
      >
        Proceed to checkout
      </Button>
    </div>
  );
};

export default Total;
