import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { ModalProps } from "../../services/types/modalTypes";
import classes from "./Modal.module.css";
import { ModalHeader } from "./ModalHeader/ModalHeader";
import { ModalOverlay } from "./ModalOverlay/ModalOverlay";
import { Portal } from "./Portal/Portal";

export const Modal = ({ header, onClose, children }: ModalProps) => {
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [onClose]);

  return (
    <Portal>
      <>
        <div className={classes.container}>
          <div className={classes.header}>
            {header && <ModalHeader header={header} />}
            <button className={classes.button} onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </>
    </Portal>
  );
};
