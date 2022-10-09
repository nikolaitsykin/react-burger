import React, { useEffect, useState } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import classes from './Main.module.css';
import data from './utils/data';

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
