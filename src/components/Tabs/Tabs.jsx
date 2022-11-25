import React from "react";
import classes from "./Tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { _BUN, _SAUCE, _MAIN } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { CHOOSE_TAB } from "../../services/actions/ingredientsActions";

export const Tabs = () => {
  const { currentTab } = useSelector((state) => state.ingredientItems);
  const dispatch = useDispatch();
  const tabsToggle = (e) => {
    dispatch({ type: CHOOSE_TAB, value: e });
    const tabTarget = document.querySelector(`[data-tab-target="${e}"]`);
    const ingredientList = document.querySelector(`[data-list]`);
    ingredientList.scrollTo({
      top:
        tabTarget.getBoundingClientRect().top -
        ingredientList.getBoundingClientRect().top +
        ingredientList.scrollTop,
      behavior: "smooth",
    });
  };
  return (
    <div className={classes.container}>
      <Tab
        value={_BUN}
        active={currentTab === _BUN}
        onClick={(e) => tabsToggle(e)}
      >
        Buns
      </Tab>
      <Tab
        value={_SAUCE}
        active={currentTab === _SAUCE}
        onClick={(e) => tabsToggle(e)}
      >
        Sauses
      </Tab>
      <Tab
        value={_MAIN}
        active={currentTab === _MAIN}
        onClick={(e) => tabsToggle(e)}
      >
        Toppings
      </Tab>
    </div>
  );
};

export default Tabs;
