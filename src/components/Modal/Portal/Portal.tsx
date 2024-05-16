import { useEffect, useState } from "react";
import PortalReactDOM from "react-dom";
import { PortalProps } from "../../../services/types/modalTypes";

export const Portal = ({ children }: PortalProps) => {
  const [modalContainer] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(modalContainer);

    return () => {
      document.body.removeChild(modalContainer);
    };
  }, [modalContainer]);

  return PortalReactDOM.createPortal(children, modalContainer);
};
