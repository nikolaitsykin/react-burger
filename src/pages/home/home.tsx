import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { Order } from "../../components/BurgerConstructor/Order/Order";
import { OrderDetails } from "../../components/BurgerConstructor/OrderDetails/OrderDetails";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";
import { Modal } from "../../components/Modal/Modal";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { useGetIngredientsQuery } from "../../services/store/api";
import classes from "./home.module.css";

export const HomePage = () => {
  const { orderName, orderNumber, orderModalIsOpened, requestModalIsOpened } =
    useAppSelector((state) => state.burgerConstructor);

  const { closeOrderModal, closeRequestModal } = useActions();

  const onCloseOrderModal = () => {
    closeOrderModal();
  };

  const onCloseRequestModal = () => {
    closeRequestModal();
  };

  const { getIngredients, getIngredientsFailed } = useActions();

  const {
    isError: isIngredientsError,
    data: ingredients,
    isSuccess: isIngredientsGetSuccess,
  } = useGetIngredientsQuery("");

  useEffect(() => {
    if (isIngredientsGetSuccess) {
      getIngredients(ingredients);
    }
    if (isIngredientsError) {
      getIngredientsFailed();
    }
  }, [
    ingredients,
    isIngredientsGetSuccess,
    isIngredientsError,
    getIngredients,
    getIngredientsFailed,
  ]);

  return (
    <>
      <main className={classes.home}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {requestModalIsOpened && !orderModalIsOpened && (
        <Modal onClose={onCloseRequestModal}>
          <Order />
        </Modal>
      )}
      {orderModalIsOpened && (
        <Modal onClose={onCloseOrderModal}>
          <OrderDetails name={orderName} number={orderNumber} />
        </Modal>
      )}
    </>
  );
};
