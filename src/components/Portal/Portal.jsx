import PortalReactDOM from "react-dom";
import { useEffect, useState } from "react";

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

export default Portal;
