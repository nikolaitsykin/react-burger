import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import PropTypes from "prop-types";
import classes from './Total.module.css';



const Total = ({value}) => {
    return (
        <div className={classes.container}>
            <p className="text text_type_digits-medium pl-3">{value}</p>
            <div className={classes.icon}>
                <CurrencyIcon type={"primary"} />
            </div>
            <Button type="primary" size="medium">
                Press here
            </Button>
        </div>
    );
};

Total.propTypes = {
    value: PropTypes.number.isRequired,
};

export default Total;