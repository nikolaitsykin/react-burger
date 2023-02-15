import PropTypes from "prop-types";
import { useAppSelector } from "../../../hooks/redux";
import Portal from "../Portal/Portal";
import classes from "./ModalOverlay.module.css";

const ModalOverlay = ({ children, onClose }) => {
  const { modalIsOpened } = useAppSelector((store) => store.modal);
  if (!modalIsOpened) {
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
