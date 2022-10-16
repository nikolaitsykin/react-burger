import React from 'react';
import classes from './IngredientList.module.css';
import PropTypes from "prop-types";
import IngredientItem from '../IngredientItem/IngredientItem';
import {ingredientsPropTypes, _BUN, _SAUCE, _MAIN} from "../../utils/standards";

const IngredientList = ({ingredients}) => {
    return (
        <div className={classes.ingredientList}>
                <p className={`${classes.section_header} text text_type_main-medium mt-10`}>Buns</p>
                <div className={classes.ingredientSection}>
                    <div className={classes.ingredientSection_grid}>
                        {ingredients.map((item, index) => (item.type === _BUN 
                        ? (<IngredientItem item={item} key={index} /> ) 
                        : null)
                        )}
                    </div>
                </div>
                <p className="text text_type_main-medium mt-10">Sauses</p>
                <div className={classes.ingredientSection}>
                    <div className={classes.ingredientSection_grid}>
                        {ingredients.map((item, index) => (item.type === _SAUCE 
                        ? (<IngredientItem item={item} key={index} />)
                        : null)
                        )}
                    </div>
                </div>
                <p className="text text_type_main-medium mt-10">Toppings</p>
                <div className={classes.ingredientSection}>
                    <div className={classes.ingredientSection_grid}>
                        {ingredients.map((item, index) => (item.type === _MAIN 
                        ? (<IngredientItem item={item} key={index} />)
                        : null)
                        )}
                    </div>
                </div>

            </div>
    );
};

IngredientList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes),
};

export default IngredientList;