import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import PortalReactDOM from "react-dom";

const Portal = ({ children }) => {
  const [modalContainer] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(modalContainer);

    return () => {
      document.body.removeChild(modalContainer);
    };
  }, [modalContainer]);

  return PortalReactDOM.createPortal(children, modalContainer);
};

Portal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Portal;
