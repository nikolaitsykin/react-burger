import { useRef } from "react";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { _BUN, _MAIN, _SAUCE } from "../../utils/constants";
import IngredientItem from "../IngredientItem/IngredientItem";
import Loader from "../Loader/Loader";
import classes from "./IngredientList.module.css";

const IngredientList = () => {
  const { bun, sauce, main, isRequested, isRequestedError } = useAppSelector(
    (state) => state.ingredients
  );
  const { chooseTab } = useActions();

  const itemsRef = useRef();
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  function selectTab(itemsRef, bunRef, sauceRef, mainRef) {
    const buns = Math.abs(
      bunRef?.current.getBoundingClientRect().top -
        itemsRef?.current.getBoundingClientRect().top
    );
    const sauces = Math.abs(
      sauceRef?.current.getBoundingClientRect().top -
        itemsRef?.current.getBoundingClientRect().top
    );
    const toppings = Math.abs(
      mainRef?.current.getBoundingClientRect().top -
        itemsRef?.current.getBoundingClientRect().top
    );

    if (buns < sauces && buns < toppings) {
      chooseTab(_BUN);
    } else if (sauces < buns && sauces < toppings) {
      chooseTab(_SAUCE);
    } else if (toppings < buns && toppings < sauces) {
      chooseTab(_MAIN);
    }
  }

  if (isRequestedError) {
    return "Error";
  } else if (isRequested) {
    return (
      <div className={classes.loader}>
        <Loader />
      </div>
    );
  } else
    return (
      <div
        className={classes.ingredientList}
        ref={itemsRef}
        onScroll={(e) => selectTab(itemsRef, bunRef, sauceRef, mainRef)}
        data-list
      >
        <p
          className={`${classes.section_header} text text_type_main-medium mt-10`}
          ref={bunRef}
          data-tab-target={_BUN}
        >
          Buns
        </p>
        <div className={classes.ingredientSection}>
          <div className={classes.ingredientSection_grid}>
            {bun.map((item) => (
              <IngredientItem item={item} key={item._id} />
            ))}
          </div>
        </div>
        <p
          className="text text_type_main-medium mt-10"
          ref={sauceRef}
          data-tab-target={_SAUCE}
        >
          Sauses
        </p>
        <div className={classes.ingredientSection}>
          <div className={classes.ingredientSection_grid}>
            {sauce.map((item) => (
              <IngredientItem item={item} key={item._id} />
            ))}
          </div>
        </div>
        <p
          className="text text_type_main-medium mt-10"
          ref={mainRef}
          data-tab-target={_MAIN}
        >
          Toppings
        </p>
        <div className={classes.ingredientSection}>
          <div className={classes.ingredientSection_grid}>
            {main.map((item) => (
              <IngredientItem item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default IngredientList;
