import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { _ROOT_PATH } from "../../utils/constants";
import classes from "./page-not-found-404.module.css";

export const PageNotFound404 = () => {
  return (
    <div className={classes.page_not_found_404_container}>
      <p className="text text_type_main-medium mb-6">
        Looks like you're lost in space
      </p>
      <p className={` ${classes.content} text text_type_digits-large`}>404</p>
      <Link to={_ROOT_PATH}>
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          extraClass="mb-20"
        >
          Return to the main page
        </Button>
      </Link>
    </div>
  );
};
