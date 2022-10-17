import React, {useEffect} from 'react';
import classes from './Modal.module.css';
import PropTypes from "prop-types";
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalHeader from '../ModalHeader/ModalHeader';


const Modal = ({isOpened, header, onClose, children}) => {
    const onEscape = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', onEscape);

        return () => {
            window.removeEventListener('keyup', onEscape);
        };
    });

    return (
        <ModalOverlay isOpened={isOpened} onClose={onClose}>
            <div className={classes.container}>
            <ModalHeader onClose={onClose} header={header} />
            {children}
            </div>
        </ModalOverlay>
    );
};

Modal.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any,
}

export default Modal;