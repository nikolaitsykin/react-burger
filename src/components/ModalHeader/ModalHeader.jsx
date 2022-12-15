import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import classes from "./ModalHeader.module.css";

const ModalHeader = ({ header, onClose }) => {
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
