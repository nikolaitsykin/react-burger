import React from "react";
import classes from "./Main.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { CLOSE_INGREDIENT_ITEMS_MODAL } from "../../services/actions/ingredientsActions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CLOSE_ORDER_MODAL } from "../../services/actions/constructorActions";

function App() {
  const dispatch = useDispatch();
  const { isIngredientModalOpened, selectedIngredient } = useSelector(
    (state) => state.ingredientItems
  );
  const { isOrderModalOpened, orderName, orderNumber } = useSelector(
    (state) => state.burgerConstructor
  );

  const onCloseIngredientModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_ITEMS_MODAL });
  };

  const onCloseOrderModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };

  return (
    <ErrorBoundary>
      <AppHeader />
      <main className={classes.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {isOrderModalOpened && (
        <Modal onClose={onCloseOrderModal} isOpened={isOrderModalOpened}>
          <OrderDetails name={orderName} number={orderNumber} />
        </Modal>
      )}
      {isIngredientModalOpened && (
        <Modal
          onClose={onCloseIngredientModal}
          isOpened={isIngredientModalOpened}
          header={"Ingredient details"}
        >
          <IngredientDetails item={selectedIngredient} />
        </Modal>
      )}
    </ErrorBoundary>
  );
}

export default App;
