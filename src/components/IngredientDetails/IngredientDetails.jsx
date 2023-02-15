import { ingredientsPropTypes } from "../../utils/constants";
import DetailsProperties from "../BurgerIngredients/DetailProperties/DetailProperties";
import classes from "./IngredientDetails.module.css";

const IngredientDetails = ({ item }) => {
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

IngredientDetails.propTypes = {
  item: ingredientsPropTypes.isRequired,
};

export default IngredientDetails;
