import React from 'react';
import classes from './ModalOverlay.module.css';
import PropTypes from "prop-types";
import Portal from "../Portal/Portal";



const ModalOverlay = ({ children, isOpened, onClose }) => {
    if (!isOpened) {
        return null;
    }
    
    return (
        <Portal>
            <div className={classes.container}>
                <div className={classes.overlay} onClick={onClose} />
                {children}
            </div>
        </Portal>
    );
};

ModalOverlay.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any,
};

export default ModalOverlay;