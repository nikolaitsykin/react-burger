import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import classes from './Main.module.css';
import data from '../../utils/data';

function App() {

  return (
    <main className={classes.main}>
      <AppHeader/>
      <div className={classes.container}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </div>
      
    </main>
  );
}

export default App;
