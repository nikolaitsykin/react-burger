import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useDrop } from "react-dnd";
import no_image from "../../accets/images/no_image.png";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { IIngredient } from "../../services/types/ingredientsTypes";
import { _BUN } from "../../utils/constants";
import classes from "./BurgerConstructor.module.css";
import { ConstructorItem } from "./ConstructorItem/ConstructorItem";
import { Total } from "./Total/Total";
import { Loader } from "../Loader/Loader";

export const BurgerConstructor = () => {
  const { selectedBun, selectedIngredients, isRequested, isRequestedError } =
    useAppSelector((state) => state.ingredients);

  const { addBun, getTotalPrice, addIngredient, updateSelectedIngredients } =
    useActions();

  const [{ isHover }, ingredientDropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
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
    (itemIndex: number, hoverIndex: number) => {
      const dragCard = selectedIngredients[itemIndex];
      const newCards = [...selectedIngredients];
      newCards.splice(itemIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      updateSelectedIngredients(newCards);
    },
    [selectedIngredients, updateSelectedIngredients]
  );

  if (isRequestedError) {
    return <p>Error</p>;
  }
  if (isRequested) {
    return (
      <div className={classes.loader}>
        <Loader />
      </div>
    );
  } else if (selectedIngredients) {
    return (
      <div
        className={`${classes.container} ${isHover ? classes.hovered : ""}`}
        ref={ingredientDropTarget}
        data-testid="burger-constructor"
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
            selectedIngredients.map((item: IIngredient, index: number) => (
              <ConstructorItem
                item={item}
                index={index}
                key={item.uid}
                onMove={onMove}
              />
            ))}
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
  } else {
    return <></>;
  }
};
