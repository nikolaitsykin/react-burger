import React from "react";
import classes from "./ModalHeader.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

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
