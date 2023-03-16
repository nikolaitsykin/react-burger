import { Loader } from "../../Loader/Loader";
import classes from "./Order.module.css";

export const Order = () => {
  return (
    <div className={classes.container}>
      <p className="text text_type_main-large mb-8 pt-5 pb-5">
        Proceccing your order...
      </p>
      <div className={classes.loader}>
        <Loader />
      </div>
    </div>
  );
};
