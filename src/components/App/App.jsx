import React, { useEffect } from "react";
import { Route, Router, useHistory, useLocation } from "react-router-dom";
import { useActions } from "../../hooks/actions";
import IngredientPage from "../../pages/ingredients/ingredients";
import { useGetIngredientsQuery } from "../../store/api";
import { _INGREDIENTS_ID_PATH, _ROOT_PATH } from "../../utils/constants";
import AppHeader from "./AppHeader/AppHeader";
import AppRouter from "./AppRouter/AppRouter";
import Modal from "../Modal/Modal";
import classes from "./Main.module.css";

function App() {
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  const { getIngredients, getIngredientsFailed, openModal, closeModal } =
    useActions();

  const {
    isError: isIngredientsError,
    data: ingredients,
    isSuccess: isIngredientsGetSuccess,
  } = useGetIngredientsQuery("");

  useEffect(() => {
    isIngredientsGetSuccess && getIngredients(ingredients);
    isIngredientsError && getIngredientsFailed();
  }, [
    ingredients,
    isIngredientsGetSuccess,
    isIngredientsError,
    getIngredients,
    getIngredientsFailed,
  ]);

  const ModalSwitch = () => {
    useEffect(() => {
      if (background) {
        openModal();
      }
    });

    const handleModalClose = () => {
      history.goBack();
      window.history.replaceState(null, null, _ROOT_PATH);
      closeModal();
    };

    return (
      <React.StrictMode>
        <AppHeader />
        <main className={classes.main}>
          <AppRouter />

          {background && (
            <Route
              path={_INGREDIENTS_ID_PATH}
              children={
                <Modal
                  header="Ingredient details"
                  onClose={() => handleModalClose()}
                >
                  <IngredientPage />
                </Modal>
              }
            />
          )}
        </main>
      </React.StrictMode>
    );
  };
  return (
    <div>
      <Router history={history}>
        <ModalSwitch />
      </Router>
    </div>
  );
}

export default App;
