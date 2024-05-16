import { PropertiesItemProps } from "../../../services/types/ingredientsTypes";
import classes from "./PropertiesItem.module.css";

export const PropertiesItem = ({ title, value }: PropertiesItemProps) => {
  return (
    <div className={classes.container}>
      <p className="text text_type_main-default text_color_inactive mb-2">
        {title}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </div>
  );
};
