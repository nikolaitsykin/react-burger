import React, { useEffect, useState } from 'react';
import classes from './Main.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { fetchRequest } from '../../utils/fetchRequest';
import { _URL } from '../../utils/standards';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';


function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetchRequest(_URL, setState)
  }, []);

  return (
    <main className={classes.main}>
      <ErrorBoundary>
        <AppHeader/>
        <div className={classes.container}>
          <BurgerIngredients data={state}/>
          <BurgerConstructor data={state}/>
        </div>
      </ErrorBoundary>
    </main>
  );
}

export default App;
