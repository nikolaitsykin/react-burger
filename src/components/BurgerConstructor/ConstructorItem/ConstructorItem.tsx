import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Identifier } from "dnd-core";
import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useActions } from "../../../hooks/actions";
import { ConstructorItemProps } from "../../../services/types/constructorTypes";
import { IIngredient } from "../../../services/types/ingredientsTypes";
import classes from "./ConstructorItem.module.css";

export const ConstructorItem = ({
  item,
  index,
  onMove,
}: ConstructorItemProps) => {
  const { removeIngredient, getTotalPrice } = useActions();

  const ref = useRef<HTMLInputElement>(null);

  const deleteIngredientItem = (item: IIngredient) => {
    removeIngredient(item);
    getTotalPrice();
  };
  const [{ handlerId }, drop] = useDrop<
    IIngredient,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: IIngredient, monitor) => {
      if (!ref.current) {
        return;
      }
      const itemIndex = item.index;
      const hoverIndex = index;

      if (itemIndex === hoverIndex) {
        return;
      }
      const rect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (rect.bottom - rect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - rect.top;

      if (itemIndex && itemIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (itemIndex && itemIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      if (itemIndex) {
        onMove(itemIndex, hoverIndex);
      }
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ ...item, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={`${classes.item} ${
        isDragging ? classes.dragging : classes.item
      }`}
      ref={ref}
      data-handler-id={handlerId}
      onDrop={(e) => e.preventDefault()}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteIngredientItem(item)}
      />
    </div>
  );
};
