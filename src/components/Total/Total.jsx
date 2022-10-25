import { useState, useContext, useEffect, useReducer} from 'react';
import classes from './Total.module.css';
import PropTypes from "prop-types";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useModal } from '../../hooks/useModal';
import { IngredientItemsContext } from "../../context/IngredientItemsContext";
import { OrderIdContext } from "../../context/OrderIdContext"
import { reducer } from "../../services/reducers/TotalReducer";
import { _ORDER_URL } from '../../utils/constants';
import { fetchPost } from "../../utils/fetchRequests";

export const Total = () => {
    const ingredientItems = useContext(IngredientItemsContext);
    const {isModalActive, toggleModal, onClose} = useModal();
    
    const [orderIdData, setOrderIdData] = useState(useContext(OrderIdContext));

    const initialTotalValue = { total: 0 };

    const [total, totalDispatch] = useReducer(reducer, initialTotalValue, undefined);
    

    const getTotalSum = () => 
        ingredientItems.map((item) => item.price).reduce((a, b) => 
        a + b, 0) + ingredientItems[0].price;

    const totalSum = getTotalSum();

    useEffect(() => {
        totalDispatch({type: "reset",});
        totalDispatch({type: "addTotal", payload: totalSum,});
    }, [ingredientItems, totalSum]);

    const data = ingredientItems.map((item) => item._id);


    const getOrderId= () => {
        fetchPost(_ORDER_URL, { ingredients: data })
        .then((data) => {
            setOrderIdData({
                number: data.order.number,
                name: data.name,
            });
        toggleModal(true);
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className={classes.container}>
            <p className="text text_type_digits-medium pl-3">{total.total}</p>
            <div className={classes.icon}>
                <CurrencyIcon type={"primary"} />
            </div>
            <Button 
                htmlType={"submit"}
                type="primary"
                size="large"
                onClick={getOrderId}
                >
                Proceed to checkout
            </Button>
            {isModalActive && (
                <Modal 
                    onClose={onClose}
                    isOpened={isModalActive}>
                    <OrderIdContext.Provider value={orderIdData}>
                        <OrderDetails />
                    </OrderIdContext.Provider>
                </Modal>
            )}
        </div>
    );
};

Total.propTypes = {
    value: PropTypes.number.isRequired,
};

export default Total;

