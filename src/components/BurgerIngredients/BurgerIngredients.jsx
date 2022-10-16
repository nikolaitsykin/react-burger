import React from 'react';
import classes from './BurgerIngredients.module.css';
import PropTypes from "prop-types";
import Tabs from '../Tabs/Tabs';
import IngredientList from '../IngredientList/IngredientList';
import { ingredientsPropTypes } from '../../utils/standards';



export const BurgerIngredients = ({data}) => {
    
    return (
        <div className={classes.container}>
            <p className="text text_type_main-large mt-10 mb-5">
                Assemble burger
            </p>
            <Tabs/>
            <IngredientList ingredients={data}/>
        </div>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes),
};


export default BurgerIngredients