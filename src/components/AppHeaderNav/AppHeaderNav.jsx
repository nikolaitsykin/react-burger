import React from 'react';
import AppHeaderNavItem from '../AppHeaderNavItem/AppHeaderNavItem';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './AppHeaderNav.module.css'

const AppHeaderNav = () => {
    return (
        <nav >
            <div className={classes.container}>
                <AppHeaderNavItem isActive value={'Constructor'}>
                    <BurgerIcon type={"primary"} className={'mr-2'}/>
                </AppHeaderNavItem>
                <AppHeaderNavItem value={'Order ribbon'}>
                    <ListIcon type={"secondary"} className={'mr-2'}/>
                </AppHeaderNavItem>
            </div>
        </nav>
    );
};


// AppHeaderNav.propTypes = {
//     isActive: PropTypes.bool,
//     value: PropTypes.string,
// };

export default AppHeaderNav;