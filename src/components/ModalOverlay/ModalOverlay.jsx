import React from "react";
import classes from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import Portal from "../Portal/Portal";

const ModalOverlay = ({ children, isOpened, onClose }) => {
  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div className={classes.container}>
        <div className={classes.ovelay} onClick={onClose}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

ModalOverlay.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
