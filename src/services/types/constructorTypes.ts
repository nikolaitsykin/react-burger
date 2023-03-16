import { IIngredient } from "./ingredientsTypes";

export interface ConstructorItemProps {
  item: IIngredient;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}
