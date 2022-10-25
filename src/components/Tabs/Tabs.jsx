import React from "react";
import classes from './Tabs.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {_BUN, _SAUCE, _MAIN} from '../../utils/constants';

export const Tabs = () => {
    const [current, setCurrent] = React.useState(_BUN)
    return (
        <div className={classes.container}>
                <Tab value={_BUN} active={current === _BUN} onClick={setCurrent}>
                    Buns
                </Tab>
                <Tab value={_SAUCE} active={current === _SAUCE} onClick={setCurrent}>
                    Sauses
                </Tab>
                <Tab value={_MAIN} active={current === _MAIN} onClick={setCurrent}>
                    Toppings
                </Tab>
            </div>
    )
}

export default Tabs;