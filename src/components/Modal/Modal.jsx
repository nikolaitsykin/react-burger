import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import ModalHeader from "../ModalHeader/ModalHeader";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import classes from "./Modal.module.css";

const Modal = ({ isOpened, header, onClose, children }) => {
  useEffect(() => {
    if (!isOpened) return;

    const onEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
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
  children: PropTypes.element.isRequired,
};

export default Modal;
