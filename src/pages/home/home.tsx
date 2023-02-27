import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import OrderDetails from "../../components/BurgerConstructor/OrderDetails/OrderDetails";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import Modal from "../../components/Modal/Modal";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import classes from "./home.module.css";
import React from "react";

export default function HomePage() {
  const { orderName, orderNumber, orderModalIsOpened } = useAppSelector(
    (store) => store.burgerConstructor
  );

  const { closeOrderModal } = useActions();

  const onCloseOrderModal = () => {
    closeOrderModal();
  };

  return (
    <>
      <main className={classes.home}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {orderModalIsOpened && (
        <Modal onClose={onCloseOrderModal}>
          <OrderDetails name={orderName} number={orderNumber} />
        </Modal>
      )}
    </>
  );
}
