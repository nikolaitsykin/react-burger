import classes from "./BurgerIngredients.module.css";
import { IngredientList } from "./IngredientList/IngredientList";
import { Tabs } from "./Tabs/Tabs";

export const BurgerIngredients = () => {
  return (
    <div className={classes.container}>
      <p className="text text_type_main-large mt-10 mb-5">Assemble burger</p>
      <Tabs />
      <IngredientList />
    </div>
  );
};
