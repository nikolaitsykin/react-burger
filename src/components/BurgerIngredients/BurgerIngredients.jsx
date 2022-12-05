import React from "react";
import IngredientList from "../IngredientList/IngredientList";
import Tabs from "../Tabs/Tabs";
import classes from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {
  return (
    <section>
      <div className={classes.container}>
        <p className="text text_type_main-large mt-10 mb-5">Assemble burger</p>
        <Tabs />
        <IngredientList />
      </div>
    </section>
  );
};

export default BurgerIngredients;
