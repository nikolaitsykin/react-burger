import { ModalHeaderProps } from "../../../services/types/modalTypes";
import classes from "./ModalHeader.module.css";

export const ModalHeader = ({ header }: ModalHeaderProps) => {
  return (
    <div className={classes.container}>
      <p className="text text_type_main-large">{header}</p>
    </div>
  );
};
