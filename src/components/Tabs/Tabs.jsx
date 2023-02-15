import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { _BUN, _MAIN, _SAUCE } from "../../utils/constants";
import classes from "./Tabs.module.css";

export const Tabs = () => {
  const { currentTab } = useAppSelector((state) => state.ingredients);
  const { chooseTab } = useActions();

  const tabsToggle = (e) => {
    chooseTab(e);
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
