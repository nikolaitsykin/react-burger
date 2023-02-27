import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useActions } from "../../../hooks/actions";
import { useAppSelector } from "../../../hooks/redux";
import { usePostOrderDataMutation } from "../../../store/api";
import { _LOGIN_PATH } from "../../../utils/constants";
import Loader from "../../Loader/Loader";
import classes from "./Total.module.css";

export const Total = () => {
  const [makeOrder, { isLoading, isError }] = usePostOrderDataMutation();

  const history = useHistory();
  const { isAuth } = useAppSelector((state) => state.auth);

  const { selectedIngredients, selectedBun, total } = useAppSelector(
    (state) => state.ingredients
  );

  const { resetConstructor, getOrderData, openOrderModal } = useActions();

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
    isAuth && selectedBun._id && selectedIngredients.length
      ? makeOrder(dataIds)
          .unwrap()
          .then((res) => {
            getOrderData(res);
            openOrderModal();
            resetConstructor();
          })
      : history.replace(_LOGIN_PATH);
  };

  if (isLoading)
    return (
      <div className={classes.loader}>
        <Loader />
      </div>
    );
  else if (isError) return <p>Error</p>;
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
