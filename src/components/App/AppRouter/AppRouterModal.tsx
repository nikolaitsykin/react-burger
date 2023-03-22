import { Route, useHistory } from "react-router-dom";
import { useActions } from "../../../hooks/actions";
import { IngredientPage } from "../../../pages/ingredients/ingredients";
import {
  _FEED_ID_PATH,
  _INGREDIENTS_ID_PATH,
  _ORDERS_ID_PATH,
  _ORDER_PATH,
  _ROOT_PATH
} from "../../../utils/constants";
import { Order } from "../../BurgerConstructor/Order/Order";
import { FeedDetails } from "../../Feed/FeedDetails/FeedDetails";
import { Modal } from "../../Modal/Modal";

export const AppRouterModal = () => {
  const history = useHistory();
  const { closeModal } = useActions();

  const handleModalClose = () => {
    history.goBack();
    window.history.replaceState(null, "", _ROOT_PATH);
    closeModal();
  };

  return (
    <>
      <Route
        path={_INGREDIENTS_ID_PATH}
        children={
          <Modal header="Ingredient details" onClose={handleModalClose}>
            <IngredientPage />
          </Modal>
        }
      />
      <Route
        path={_FEED_ID_PATH}
        children={
          <Modal onClose={handleModalClose}>
            <FeedDetails />
          </Modal>
        }
      />
      <Route
        path={_ORDERS_ID_PATH}
        children={
          <Modal onClose={handleModalClose}>
            <FeedDetails />
          </Modal>
        }
      />
      <Route
        path={_ORDER_PATH}
        exact={true}
        children={
          <Modal onClose={handleModalClose}>
            <Order />
          </Modal>
        }
      />
    </>
  );
};
