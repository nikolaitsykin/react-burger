import { ModalOverlayProps } from "../../../services/types/modalTypes";
import classes from "./ModalOverlay.module.css";

export const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
  return <div className={classes.container} onClick={onClose}></div>;
};
