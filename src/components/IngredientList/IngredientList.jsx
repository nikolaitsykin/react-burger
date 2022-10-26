import { useContext } from "react";
import classes from "./IngredientList.module.css";
import IngredientItem from "../IngredientItem/IngredientItem";
import { _BUN, _SAUCE, _MAIN } from "../../utils/constants";
import { IngredientDataContext } from "../../context/IngredientDataContext";
import { IngredientItemsContext } from "../../context/IngredientItemsContext";

const IngredientList = () => {
  const ingredientItems = useContext(IngredientDataContext);
  const sortedItems = useContext(IngredientItemsContext);

  const addedItems = sortedItems.map((item) => item._id);

  return (
    <div className={classes.ingredientList}>
      <p
        className={`${classes.section_header} text text_type_main-medium mt-10`}
      >
        Buns
      </p>
      <div className={classes.ingredientSection}>
        <div className={classes.ingredientSection_grid}>
          {ingredientItems.map((item) =>
            item.type === _BUN ? (
              <IngredientItem
                item={item}
                key={item._id}
                count={addedItems.indexOf(item._id) >= 0 ? 1 : null}
              />
            ) : null
          )}
        </div>
      </div>
      <p className="text text_type_main-medium mt-10">Sauses</p>
      <div className={classes.ingredientSection}>
        <div className={classes.ingredientSection_grid}>
          {ingredientItems.map((item) =>
            item.type === _SAUCE ? (
              <IngredientItem
                item={item}
                key={item._id}
                count={addedItems.indexOf(item._id) >= 0 ? 1 : null}
              />
            ) : null
          )}
        </div>
      </div>
      <p className="text text_type_main-medium mt-10">Toppings</p>
      <div className={classes.ingredientSection}>
        <div className={classes.ingredientSection_grid}>
          {ingredientItems.map((item) =>
            item.type === _MAIN ? (
              <IngredientItem
                item={item}
                key={item._id}
                count={addedItems.indexOf(item._id) >= 0 ? 1 : null}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientList;
