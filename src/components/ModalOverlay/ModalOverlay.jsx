import React from "react";
import PropTypes from "prop-types";
import Portal from "../Portal/Portal";
import classes from "./ModalOverlay.module.css";
import { useSelector } from "react-redux";

const ModalOverlay = ({ children, onClose }) => {
  const modalIsOpen = useSelector((store) => store.modalReducer);
  if (!modalIsOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={classes.container} onClick={onClose}>
        <div className={classes.overlay} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
