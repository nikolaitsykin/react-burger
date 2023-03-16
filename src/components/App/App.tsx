import React, { useEffect } from "react";
import { Router, useHistory, useLocation } from "react-router-dom";
import { useActions } from "../../hooks/actions";
import { useGetIngredientsQuery } from "../../services/store/api";
import { ILocationState } from "../../services/types/locationTypes";
import { AppHeader } from "./AppHeader/AppHeader";
import { AppRouter } from "./AppRouter/AppRouter";
import { AppRouterModal } from "./AppRouter/AppRouterModal";
import classes from "./Main.module.css";

export const App = () => {
  const { getIngredients, getIngredientsFailed, openModal } = useActions();

  const {
    isError: isIngredientsError,
    data: ingredients,
    isSuccess: isIngredientsGetSuccess,
  } = useGetIngredientsQuery("");

  const history = useHistory();
  const location = useLocation<ILocationState>();
  const background = location.state && location.state.background;

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

    return (
      <React.StrictMode>
        <AppHeader />
        <main className={classes.main}>
          <AppRouter />
          {background && <AppRouterModal />}
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
};
