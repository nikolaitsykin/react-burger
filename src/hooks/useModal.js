import { useState } from "react";

export const useModal = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const toggleModal = () => setIsModalActive((state) => !state);

  const onClose = () => {
    setIsModalActive(false);
  };

  return { isModalActive, toggleModal, onClose };
};
