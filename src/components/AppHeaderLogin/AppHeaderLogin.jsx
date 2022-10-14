import React from 'react';
import classes from './AppHeaderLogin.module.css';
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";


const AppHeaderLogin = () => {
    return (
        <div className={classes.container}>
            <a href='/' className={classes.navItem}>
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2">
                    Account
                </p>
            </a>
        </div>
    );
};

export default AppHeaderLogin;