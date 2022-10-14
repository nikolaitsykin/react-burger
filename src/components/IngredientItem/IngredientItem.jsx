import React, {useState} from 'react';
import classes from './IngredientItem.module.css';
import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from "../../utils/standards";
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails'



const IngredientItem = ({item}) => {
    const [count, setCount] = React.useState(0);

    const [modalActive, setModalActive] = useState(false);

    const onClose = () => {
        setModalActive(false);
    };
    
    return (
        <>
        <div className={classes.container} onClick={() => setModalActive(true)}>
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
        {modalActive && (
            <Modal
                onClose={onClose}
                isOpened={modalActive}
                header={"Ingredient details"}
            >
                <IngredientDetails item={item} />
            </Modal>
        )}
        </>
    );
};

IngredientItem.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes)
}
export default IngredientItem;