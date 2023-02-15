import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import no_image from "../../images/no_image.png";
import { _BUN } from "../../utils/constants";
import ConstructorItem from "./ConstructorItem/ConstructorItem";
import Total from "./Total/Total";
import classes from "./BurgerConstructor.module.css";

export const BurgerConstructor = () => {
  const { selectedBun, selectedIngredients, isRequestedError } = useAppSelector(
    (state) => state.ingredients
  );

  const { addBun, getTotalPrice, addIngredient, updateSelectedIngredients } =
    useActions();

  const [{ isHover }, ingredientDropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      const newItem = { ...item };
      if (item.type === _BUN) {
        addBun(item);
        getTotalPrice();
      } else {
        newItem.uid = nanoid(8);
        addIngredient(newItem);
        getTotalPrice();
      }
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

      updateSelectedIngredients(newCards);
    },
    [selectedIngredients, updateSelectedIngredients]
  );

  if (isRequestedError) {
    return "Error";
  } else if (selectedIngredients) {
    return (
      <div
        className={`${classes.container} ${isHover ? classes.hovered : ""}`}
        ref={ingredientDropTarget}
      >
        <div className={"pl-6"}>
          <ConstructorElement
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
