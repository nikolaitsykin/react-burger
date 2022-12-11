import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ModalHeader from "../ModalHeader/ModalHeader";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import classes from "./Modal.module.css";

const Modal = ({ header, onClose, children }) => {
  const modalIsOpened = useSelector((store) => store.modalReducer);

  useEffect(() => {
    if (!modalIsOpened) return;

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
    <ModalOverlay onClose={onClose}>
      <div className={classes.container}>
        <ModalHeader onClose={onClose} header={header} />
        {children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
