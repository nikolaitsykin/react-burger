import React from "react";
import PropTypes from "prop-types";
import Portal from "../Portal/Portal";
import classes from "./ModalOverlay.module.css";

const ModalOverlay = ({ children, isOpened, onClose }) => {
  if (!isOpened) {
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
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
