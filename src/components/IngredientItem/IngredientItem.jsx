import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from "../../utils/standards";
import PropTypes from "prop-types";
import classes from './IngredientItem.module.css';


const IngredientItem = ({item}) => {
    const [count, setCount] = React.useState(0);
    
    return (
        <div className={classes.container}>
            <div className={classes.top}>
                {count > 0 && <Counter className={classes.counter} count={count} size="default"/>}
                <img src={item.image}/>
            </div>
            <div className={classes.body}>
                <div className={classes.price}>
                    <p className="text text_type_digits-default pr-2">{item.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <div className={classes.name}>
                    <p className="text text_type_main-default pt-13">{item.name}</p>
                </div>
                
            </div>
        </div>
    );
};

IngredientItem.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes)
}
export default IngredientItem;