import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/BurgerConstructor/OrderDetails/OrderDetails";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import classes from "./home.module.css";

const HomePage = () => {
  const { orderName, orderNumber } = useAppSelector(
    (state) => state.burgerConstructor
  );

  const { modalIsOpened } = useAppSelector((state) => state.modal);

  const { closeModal } = useActions();

  const onCloseOrderModal = () => {
    closeModal();
  };

  return (
    <>
      <main className={classes.home}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {modalIsOpened && (
        <Modal onClose={onCloseOrderModal}>
          <OrderDetails name={orderName} number={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
