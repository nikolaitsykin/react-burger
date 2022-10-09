import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './Total.module.css';



const Total = (props) => {
    return (
        <div className={classes.container}>
            <p className="text text_type_digits-medium pl-3">{props.total}</p>
            <div className={classes.icon}>
                <CurrencyIcon/>
            </div>
            <Button type="primary" size="medium">
                Press here
            </Button>
        </div>
    );
};

export default Total;