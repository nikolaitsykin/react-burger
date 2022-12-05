import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DetailProperties from "../../components/DetailProperties/DetailProperties";
import classes from "./ingredients.module.css";

const IngredientsPage = () => {
  const { items } = useSelector((store) => store.ingredientItems);
  const { ingredientId } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const neededItem = {
      ...items.filter((item) => item._id === ingredientId)[0],
    };
    setItem(neededItem);
  }, [items, ingredientId]);

  return (
    <div className={classes.ingredient_container}>
      <img src={item.image_large} alt={item.name} className="mb-4" />
      <p className="text text_type_main-large mb-8">Ingredient details</p>
      <p className="text text_type_main-medium mb-8">{item.name}</p>
      <DetailProperties ingredient={item} />
      <Link to="/">
        <Button type="primary" htmlType="button" extraClass="mb-20 mt-10">
          Back
        </Button>
      </Link>
    </div>
  );
};

export default IngredientsPage;
