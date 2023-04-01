import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DetailProperties } from "../../components/BurgerIngredients/DetailProperties/DetailProperties";
import { useAppSelector } from "../../hooks/redux";
import { emptyIngredient } from "../../services/store/reducers/ingredients.slice";
import { IIngredient } from "../../services/types/ingredientsTypes";
import { ILocationState } from "../../services/types/locationTypes";
import classes from "./ingredients.module.css";

export const IngredientPage = () => {
  const { ingredientItems } = useAppSelector((state) => state.ingredients);
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const [item, setItem] = useState<IIngredient>(emptyIngredient);
  const location = useLocation<ILocationState>();
  const background = location.state && location.state.background;

  useEffect(() => {
    const selectedItem: IIngredient = {
      ...ingredientItems.filter((item) => item._id === ingredientId)[0],
    };

    setItem(selectedItem);
  }, [ingredientItems, ingredientId]);

  return (
    <div className={classes.ingredient_container}>
      {!background && (
        <p className="text text_type_main-large mb-8 mt-30">
          Ingredient details
        </p>
      )}
      <img src={item.image_large} alt={item.name} className="mb-4" />
      <p
        className="text text_type_main-medium mb-8"
        data-testid="ingredient-details-name"
      >
        {item.name}
      </p>
      <DetailProperties ingredient={item} />
    </div>
  );
};
