import { useEffect, useState, useCallback, useContext  } from 'react';
import classes from './Main.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { fetchRequest } from '../../utilities/fetchRequests';
import { _ITEMS_URL, sortIngredients } from '../../utilities/standards';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import {IngredientDataContext} from "../../context/IngredientDataContext";
import {IngredientItemsContext} from "../../context/IngredientItemsContext";


function App() {

  const [data, setData] = useState(useContext(IngredientDataContext));
  const [sorted, setSorted] = useState(useContext(IngredientItemsContext));

  const sortData = useCallback(() => sortIngredients(data), [data]);

  useEffect(() => {
    fetchRequest(_ITEMS_URL, setData);
  }, []);

  useEffect(() => setSorted(sortData), [setSorted, sortData]);

  return (
    <main className={classes.main}>
      <ErrorBoundary>
        <AppHeader/>
        <div className={classes.container}>
          <IngredientItemsContext.Provider value={sorted}>
            <IngredientDataContext.Provider value={data}>
              <BurgerIngredients />
              <BurgerConstructor />
            </IngredientDataContext.Provider>
          </IngredientItemsContext.Provider>
        </div>
      </ErrorBoundary>
    </main>
  );
}

export default App;
