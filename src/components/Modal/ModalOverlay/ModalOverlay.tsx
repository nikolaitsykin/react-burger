import { MouseEventHandler, ReactElement } from "react";
import Portal from "../Portal/Portal";
import classes from "./ModalOverlay.module.css";

interface ModalOverlayProps {
  children: ReactElement;
  onClose: MouseEventHandler<HTMLDivElement>;
}

const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
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

export default ModalOverlay;
