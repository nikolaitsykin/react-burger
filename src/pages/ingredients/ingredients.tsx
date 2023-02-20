import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DetailProperties from "../../components/BurgerIngredients/DetailProperties/DetailProperties";
import { useAppSelector } from "../../hooks/redux";
import classes from "./ingredients.module.css";
import { ILocationState, IIngredient } from "../../models/models";
import { RootState } from "../../store";
import { emptyIngredient } from "../../store/ingredients.slice";

const IngredientPage = () => {
  const { items } = useAppSelector((store: RootState) => store.ingredients);
  const { ingredientId } = useParams<{ ingredientId?: string }>();
  const [item, setItem] = useState<IIngredient>(emptyIngredient);
  const location = useLocation<ILocationState>();
  const background = location.state && location.state.background;

  useEffect(() => {
    const selectedItem: IIngredient = {
      ...items.filter((item) => item._id === ingredientId)[0],
    };

    setItem(selectedItem);
  }, [items, ingredientId]);

  return (
    <div className={classes.ingredient_container}>
      {!background && (
        <p className="text text_type_main-large mb-8 mt-30">
          Ingredient details
        </p>
      )}
      <img src={item.image_large} alt={item.name} className="mb-4" />
      <p className="text text_type_main-medium mb-8">{item.name}</p>
      <DetailProperties ingredient={item} />
    </div>
  );
};

export default IngredientPage;
