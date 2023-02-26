import React, { useEffect } from "react";
import { Route, Router, useHistory, useLocation } from "react-router-dom";
import { useActions } from "../../hooks/actions";
import { ILocationState } from "../../models/models";
import IngredientPage from "../../pages/ingredients/ingredients";
import { useGetIngredientsQuery } from "../../store/api";
import { _INGREDIENTS_ID_PATH, _ROOT_PATH } from "../../utils/constants";
import Modal from "../Modal/Modal";
import AppHeader from "./AppHeader/AppHeader";
import AppRouter from "./AppRouter/AppRouter";
import classes from "./Main.module.css";

export default function App() {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const background = location.state && location.state.background;

  const { getIngredients, getIngredientsFailed, openModal, closeModal } =
    useActions();

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

  const ModalSwitch = () => {
    useEffect(() => {
      if (background) {
        openModal();
      }
    });

    const handleModalClose = () => {
      history.goBack();
      window.history.replaceState(null, "", _ROOT_PATH);
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
