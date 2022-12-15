import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Route,
  Router,
  useHistory,
  useLocation
} from "react-router-dom";
import IngredientPage from "../../pages/ingredients/ingredients";
import { MODAL_CLOSE, MODAL_OPEN } from "../../services/actions/modal";
import { getIngredients } from "../../services/reducers/ingredients";
import { _INGREDIENTS_ID_PATH } from "../../utils/constants";
import AppHeader from "../AppHeader/AppHeader";
import AppRouter from "../AppRouter/AppRouter";
import Modal from "../Modal/Modal";
import classes from "./Main.module.css";

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
              path={_INGREDIENTS_ID_PATH}
              children={
                <Modal
                  onClose={() => handleModalClose()}
                  header="Ingredient details"
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
