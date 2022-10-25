import  { useContext } from 'react';
import classes from './BurgerConstructor.module.css';
import PropTypes from "prop-types";
import Total from '../Total/Total';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes, _BUN } from '../../utils/constants';
import { IngredientItemsContext } from "../../context/IngredientItemsContext";

export const BurgerConstructor = () => {

    const ingredientItems = useContext(IngredientItemsContext);

    return (
        <>
            {ingredientItems.length && (
                <div className={classes.container}>
                    <div className={"pl-6"}>
                        <ConstructorElement
                            key={ingredientItems[0]._id}
                            type="top"
                            isLocked
                            text={ingredientItems[0].name + "(top)"}
                            price={ingredientItems[0].price}
                            thumbnail={ingredientItems[0].image}
                        />
                    </div>
                    <div className={classes.componentList}>
                        {ingredientItems.map((ingredientItems) => {
                        return ingredientItems.type !== _BUN ? (
                            <div className={classes.item}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                key={ingredientItems._id}
                                text={ingredientItems.name}
                                price={ingredientItems.price}
                                thumbnail={ingredientItems.image}
                            />
                            </div>
                            ) : null;
                        })}
                    </div>
                    <div className={"pl-6"}>
                        <ConstructorElement
                            key={ingredientItems[0]._id}
                            type="bottom"
                            isLocked={true}
                            text={ingredientItems[0].name + "(bottom)"}
                            price={ingredientItems[0].price}
                            thumbnail={ingredientItems[0].image}
                        />
                    </div>
                    <Total/>
                </div>
            )}
        </>
    );
};


BurgerConstructor.propTypes = {
    ingredientItems: PropTypes.arrayOf(ingredientsPropTypes),
};

export default BurgerConstructor;