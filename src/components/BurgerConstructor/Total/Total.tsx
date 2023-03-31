import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useActions } from "../../../hooks/actions";
import { useAppSelector } from "../../../hooks/redux";
import { usePostOrderDataMutation } from "../../../services/store/api";
import { _LOGIN_PATH } from "../../../utils/constants";
import classes from "./Total.module.css";

export const Total = () => {
  const [makeOrder, { isError, isLoading }] = usePostOrderDataMutation();

  const history = useHistory();
  const { isAuth } = useAppSelector((state) => state.auth);

  const { selectedIngredients, selectedBun, total } = useAppSelector(
    (state) => state.ingredients
  );

  const {
    resetConstructor,
    getOrderData,
    openOrderModal,
    openRequestModal,
    closeRequestModal,
    resetOrderModal,
  } = useActions();

  const dataIds = useMemo(() => {
    return (
      selectedIngredients &&
      selectedBun && [
        selectedBun._id,
        ...selectedIngredients.map((item) => item._id),
        selectedBun._id,
      ]
    );
  }, [selectedIngredients, selectedBun]);

  const handleOrder = () => {
    if (isAuth) {
      openRequestModal();
      resetOrderModal();

      return makeOrder(dataIds)
        .unwrap()
        .then((res) => {
          getOrderData(res);
          resetConstructor();
          closeRequestModal();
          openOrderModal();
        });
    } else {
      history.replace(_LOGIN_PATH);
    }
  };

  if (isError) return <p>An error has occured</p>;
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
        onClick={handleOrder}
        disabled={selectedIngredients.length < 1}
      >
        {!selectedIngredients.length
          ? "Add ingredients"
          : isLoading
          ? "Processing..."
          : "Proceed to checkout"}
      </Button>
    </div>
  );
};
