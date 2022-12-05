import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Router, useHistory, useLocation } from "react-router-dom";
import IngredientsPage from "../../pages/ingredients/ingredients";
import { getIngredients } from "../../services/reducers/ingredients";
import AppHeader from "../AppHeader/AppHeader";
import AppRouter from "../AppRouter/AppRouter";
import Modal from "../Modal/Modal";
import classes from "./Main.module.css";
import { MODAL_CLOSE, MODAL_OPEN } from "../../services/actions/modal";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const history = useHistory();
  const location = useLocation();

  const ModalSwitch = () => {

    const background = location.state && location.state.background;

    useEffect(() => {
      if (background) {
        dispatch({ type: MODAL_OPEN });
      }
    });

    const handleModalClose = () => {
      history.goBack();
      dispatch({ type: MODAL_CLOSE });
    };

    return (
      <React.StrictMode>
        <AppHeader />
        <main className={classes.main}>
          <AppRouter location={background || location} />

          {background && (
            <Route
              path="/ingredients/:ingredientId"
              children={
                <Modal
                  onClose={() => handleModalClose()}
                  title="Ingredient details"
                  isOpened={false}
                >
                  <IngredientsPage />
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
