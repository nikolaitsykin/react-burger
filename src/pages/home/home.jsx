import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { CLOSE_ORDER_MODAL } from "../../services/actions/constructorActions";
import { CLOSE_INGREDIENT_ITEMS_MODAL } from "../../services/actions/ingredientsActions";
import classes from "./home.module.css";


const HomePage = () => {
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
    <>
      <main className={classes.home}>
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
    </>
  );
};

export default HomePage;
