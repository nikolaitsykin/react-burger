import { MouseEventHandler, ReactElement } from "react";

export interface IModalState {
  modalIsOpened: boolean;
}

export interface ModalProps {
  header?: string;
  onClose: () => void;
  children?: ReactElement;
}

export interface ModalOverlayProps {
  children: ReactElement;
  onClose: MouseEventHandler<HTMLDivElement>;
}

export interface PortalProps {
  children: ReactElement;
}
