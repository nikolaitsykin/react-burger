import React, { useRef } from "react";
import classes from "./ConstructorItem.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../utils/constants";
import {
  GET_TOTAL_PRICE,
  DECREASE_INGREDIENT_ITEM,
} from "../../services/actions/ingredientsActions";

function ConstructorItem({ item, index, onMove }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const deleteIngredientItem = (item) => {
    dispatch({ type: DECREASE_INGREDIENT_ITEM, item: item });
    dispatch({ type: GET_TOTAL_PRICE });
  };
  const [{ handlerId }, drop] = useDrop({
    accept: "constructorElement",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item, monitor) => {
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
      const hoverClientY = clientOffset.y - rect.top;

      if (itemIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (itemIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onMove(itemIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorElement",
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const onDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`${classes.item} ${
        isDragging ? classes.dragging : classes.item
      }`}
      ref={ref}
      data-handler-id={handlerId}
      onDrop={onDrop}
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
}

ConstructorItem.propTypes = {
  item: ingredientsPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default ConstructorItem;
