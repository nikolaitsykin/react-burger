import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalProps } from "../../../services/types/modalTypes";
import classes from "./ModalHeader.module.css";

export const ModalHeader = ({ header, onClose }: ModalProps) => {
  return (
    <div className={classes.container}>
      <p className="text text_type_main-large">{header}</p>
      <div className={classes.close_btn} onClick={onClose}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
};
