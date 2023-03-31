import classes from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loader}></div>
      <p className={`${classes.content} text text_type_main-small`}>
        Please wait...
      </p>
    </div>
  );
};
