import { IIngredient } from "../../../models/models";
import DetailsProperties from "../DetailProperties/DetailProperties";
import classes from "./IngredientDetails.module.css";

interface IngredientDetailsProps {
  item: IIngredient;
}

const IngredientDetails = ({ item }: IngredientDetailsProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <img src={item.image_large} alt={item.name} />
      </div>
      <div className={classes.name}>
        <p className="text text_type_main-medium mb-8">{item.name}</p>
      </div>
      <DetailsProperties ingredient={item} />
    </div>
  );
};

export default IngredientDetails;
