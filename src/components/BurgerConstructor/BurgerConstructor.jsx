import React, { useCallback } from "react";
import classes from "./BurgerConstructor.module.css";
import Total from "../Total/Total";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import ConstructorItem from "../ConstructorItem/ConstructorItem";
import no_image from "../../images/no_image.png";
import { UPDATE_SELECTED_INGREDIENT_ITEMS } from "../../services/actions/ingredientsActions";
import { addIngredient } from "../../services/reducers/ingredients";

export const BurgerConstructor = () => {
  const { selectedBun, selectedIngredients, isRequestedError } = useSelector(
    (state) => state.ingredientItems
  );
  const dispatch = useDispatch();

  const [{ isHover }, ingredientDropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      addIngredient(dispatch, item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const onMove = useCallback(
    (itemIndex, hoverIndex) => {
      const dragCard = selectedIngredients[itemIndex];
      const newCards = [...selectedIngredients];

      newCards.splice(itemIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch({
        type: UPDATE_SELECTED_INGREDIENT_ITEMS,
        payload: newCards,
      });
    },
    [selectedIngredients, dispatch]
  );

  if (isRequestedError) {
    return "Error";
  } else if (selectedIngredients) {
    return (
      <div
        className={classes.container}
        ref={ingredientDropTarget}
      >
        <div className={"pl-6"}>
          <ConstructorElement
            className={classes.element}
            type="top"
            isLocked
            text={
              selectedBun.name
                ? selectedBun.name + " (top)"
                : "Select and drag bun"
            }
            price={selectedBun.price ? selectedBun.price : 0}
            thumbnail={selectedBun.image ? selectedBun.image : no_image}
          />
        </div>
        <div className={classes.componentList}>
          {selectedIngredients &&
            selectedIngredients.map((item, index) => {
              return (
                <ConstructorItem
                  item={item}
                  index={index}
                  key={item.uid}
                  onMove={onMove}
                />
              );
            })}
        </div>
        <div className={"pl-6"}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={
              selectedBun.name
                ? selectedBun.name + " (bottom)"
                : "Select and drag bun"
            }
            price={selectedBun.price ? selectedBun.price : 0}
            thumbnail={selectedBun.image ? selectedBun.image : no_image}
          />
        </div>
        <Total />
      </div>
    );
  }
};

export default BurgerConstructor;
