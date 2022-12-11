import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import DetailProperties from "../../components/DetailProperties/DetailProperties";
import classes from "./ingredients.module.css";

const IngredientPage = () => {
  const { items } = useSelector((store) => store.ingredientItems);
  const { ingredientId } = useParams();
  const [item, setItem] = useState({});
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    const selectedItem = {
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
