import doneImg from "../../../accets/images/done_img.svg";
import { OrderDetailsProps } from "../../../services/types/orderTypes";
import classes from "./OrderDetails.module.css";

export const OrderDetails = ({ name, number }: OrderDetailsProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.order_number}>
        <p className="text text_type_digits-large mb-8">{number}</p>
        </div>
        <div className={classes.order_name}>
        <p className="text text_type_main-medium mb-15">{name}</p>
      </div>
      <div className={classes.image}>
        <img
          src={doneImg}
          className="mb-15"
          alt="The order has been successfully placed"
        />
      </div>
      <div className={classes.order_status}>
        <p className="text text_type_main-default mb-2">
          We have started to cook your order
        </p>
        <p className="text text_type_main-default text_color_inactive mb-15">
          Wait for the order at the orbital station
        </p>
      </div>
    </div>
  );
};
