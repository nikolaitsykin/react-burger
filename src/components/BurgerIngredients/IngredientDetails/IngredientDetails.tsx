import { IngredientDetailsProps } from "../../../services/types/ingredientsTypes";
import { DetailProperties } from "../DetailProperties/DetailProperties";
import classes from "./IngredientDetails.module.css";

export const IngredientDetails = ({ item }: IngredientDetailsProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <img src={item.image_large} alt={item.name} />
      </div>
      <div className={classes.name}>
        <p className="text text_type_main-medium mb-8">{item.name}</p>
      </div>
      <DetailProperties ingredient={item} />
    </div>
  );
};
