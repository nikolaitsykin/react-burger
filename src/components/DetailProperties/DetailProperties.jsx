import React from "react";
import classes from "./DetailProperties.module.css";
import PropertiesItem from "../PropertiesItem/PropertiesItem";
import { ingredientsPropTypes } from "../../utils/constants";

const DetailProperties = ({ ingredient }) => {
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

DetailProperties.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
};

export default DetailProperties;
