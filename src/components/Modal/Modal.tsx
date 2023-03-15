import { useEffect } from "react";
import { ModalProps } from "../../services/types/modalTypes";
import classes from "./Modal.module.css";
import { ModalHeader } from "./ModalHeader/ModalHeader";
import { ModalOverlay } from "./ModalOverlay/ModalOverlay";

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
  });

  return (
    <ModalOverlay onClose={onClose}>
      <div className={classes.container}>
        {header && <ModalHeader onClose={onClose} header={header} />} {children}
      </div>
    </ModalOverlay>
  );
};
