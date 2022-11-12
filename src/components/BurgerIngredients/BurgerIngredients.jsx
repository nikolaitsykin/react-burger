import React from "react";
import classes from "./BurgerIngredients.module.css";
import Tabs from "../Tabs/Tabs";
import IngredientList from "../IngredientList/IngredientList";

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
