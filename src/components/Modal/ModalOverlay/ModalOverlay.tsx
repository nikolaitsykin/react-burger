import { ModalOverlayProps } from "../../../services/types/modalTypes";
import { Portal } from "../Portal/Portal";
import classes from "./ModalOverlay.module.css";

export const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
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
