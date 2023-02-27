import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { MouseEventHandler } from "react";
import classes from "./ModalHeader.module.css";

interface ModalProps {
  header?: string;
  onClose: MouseEventHandler<HTMLDivElement>;
}

const ModalHeader = ({ header, onClose }: ModalProps) => {
  return (
    <div className={classes.container}>
      <p className="text text_type_main-large">{header}</p>
      <div className={classes.close_btn} onClick={onClose}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
};

ModalHeader.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ModalHeader;
