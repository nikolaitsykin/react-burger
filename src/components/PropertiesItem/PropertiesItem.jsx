import PropTypes from "prop-types";
import classes from "./PropertiesItem.module.css";

const PropertiesItem = ({ title, value }) => {
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

PropertiesItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
};

export default PropertiesItem;
