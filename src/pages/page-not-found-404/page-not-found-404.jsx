import {
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./page-not-found-404.module.css";
import { Link } from "react-router-dom";


const PageNotFound404 = () => {
  return (
    <div className={classes.page_not_found_404_container}>
      <p className="text text_type_main-medium mb-6">
        Looks like you're lost in space
      </p>
      <p className={` ${classes.content} text text_type_digits-large`}>404</p>
      <Link to="/">
      <Button type="primary" size="medium" htmlType="submit" extraClass="mb-20">
        Back 
      </Button>
      </Link>
    </div>
  );
};

export default PageNotFound404;
