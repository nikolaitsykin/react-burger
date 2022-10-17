import React from 'react';
import classes from './IngredientDetails.module.css';
import PropTypes from "prop-types";
import { ingredientsPropTypes } from '../../utils/standards';
import DetailsProperties from '../DetailProperties/DetailProperties';

const IngredientDetails = ({item}) => {
    return (
        <div className={classes.container}>
            <div className={classes.image}>
                <img src={item.image_large} alt={item.name} />
            </div>
            <div className={classes.name}>
                <p className="text text_type_main-medium mb-8">{item.name}</p>
            </div>
            <DetailsProperties ingredient={item} />
        </div>
    );
};

IngredientDetails.propTypes = {
    item: PropTypes.arrayOf(ingredientsPropTypes),
};

export default IngredientDetails;