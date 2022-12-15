import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loader}></div>
      <p className={`${classes.content} text text_type_main-small`}>Loading...</p>
    </div>
  );
};

export default Loader;
