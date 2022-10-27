import React from "react";
import classes from "./AppHeaderNavItem.module.css";

const AppHeaderNavItem = (props) => {
  return (
    <div>
      <a href="/" className={`${classes.navItem} pr-5 pl-5`}>
        {props.children}
        <p
          className={`text text_type_main-default ml-2 
                ${props.isActive ? null : "text_color_inactive"}`}
        >
          {props.value}
        </p>
      </a>
    </div>
  );
};

export default AppHeaderNavItem;
