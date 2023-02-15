import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { _ROOT_PATH } from "../../../../utils/constants";
import classes from "./AppHeaderNavItem.module.css";

const AppHeaderNavItem = ({ children, isActive, value }) => {
  return (
    <div>
      <Link to={_ROOT_PATH} className={`${classes.navItem} pr-5 pl-5`}>
        {children}
        <p
          className={`text text_type_main-default ml-2 
                ${isActive ? null : "text_color_inactive"}`}
        >
          {value}
        </p>
      </Link>
    </div>
  );
};

AppHeaderNavItem.propTypes = {
  isActive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default AppHeaderNavItem;
