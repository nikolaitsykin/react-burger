import React, {useState} from 'react';
import classes from './Total.module.css';
import PropTypes from "prop-types";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

const Total = ({value}) => {
    const [modalActive, setModalActive] = useState(false);

    const onClose = () => {
        setModalActive(false);
    };

    return (
        <div className={classes.container}>
            <p className="text text_type_digits-medium pl-3">{value}</p>
            <div className={classes.icon}>
                <CurrencyIcon type={"primary"} />
            </div>
            <Button 
                htmlType={"submit"}
                type="primary"
                size="large"
                onClick={() => {setModalActive(true)}}
                >
                Proceed to checkout
            </Button>
            {modalActive && (
                <Modal onClose={onClose} isOpened={modalActive}>
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
};

Total.propTypes = {
    value: PropTypes.number.isRequired,
};

export default Total;