import doneImg from "../../../images/done_img.svg";
import classes from "./OrderDetails.module.css";

const OrderDetails = ({ name, number }) => {
  return (
    <div className={classes.container}>
      <div className={classes.order_number}>
        <p className="text text_type_digits-large mb-8">{number}</p>
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

export default OrderDetails;
