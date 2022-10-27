import { useEffect, useState, useCallback, useContext } from "react";
import classes from "./Main.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { fetchGet } from "../../utils/fetchRequests";
import { _ITEMS_URL, sortIngredients } from "../../utils/constants";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { IngredientDataContext } from "../../context/IngredientDataContext";
import { IngredientItemsContext } from "../../context/IngredientItemsContext";

function App() {
  const [data, setData] = useState(useContext(IngredientDataContext));
  const [sorted, setSorted] = useState(useContext(IngredientItemsContext));

  const sortData = useCallback(() => sortIngredients(data), [data]);

  useEffect(() => {
    fetchGet(_ITEMS_URL)
      .then(({ data }) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => setSorted(sortData), [setSorted, sortData]);

  return (
    <ErrorBoundary>
      <AppHeader />
      <main className={classes.main}>
        <IngredientItemsContext.Provider value={sorted}>
          <IngredientDataContext.Provider value={data}>
            <BurgerIngredients />
            <BurgerConstructor />
          </IngredientDataContext.Provider>
        </IngredientItemsContext.Provider>
      </main>
    </ErrorBoundary>
  );
}

export default App;
