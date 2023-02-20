import { IIngredient } from "../../../models/models";
import PropertiesItem from "../PropertiesItem/PropertiesItem";
import classes from "./DetailProperties.module.css";

interface DetailPropertiesProps {
  ingredient: IIngredient;
}

const DetailProperties = ({ ingredient }: DetailPropertiesProps) => {
  const { calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <div className={classes.container}>
      <PropertiesItem title="Calories, ccal" value={calories} />
      <PropertiesItem title="Proteins, g" value={proteins} />
      <PropertiesItem title="Fat, g" value={fat} />
      <PropertiesItem title="Carbs, g" value={carbohydrates} />
    </div>
  );
};

export default DetailProperties;
