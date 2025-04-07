import { useState } from "react";

const useModal = () => {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setItemToDelete(null);
  };

  const openPreviewModal = (card) => {
    if (!card?._id) {
      console.error("Card is missing _id", card);
      return;
    }
    setSelectedCard(card);
    openModal("preview");
  };

  const openDeleteConfirmation = (item) => {
    setItemToDelete(item);
    openModal("delete-confirmation");
  };

  return {
    activeModal,
    openModal,
    closeModal,
    selectedCard,
    setSelectedCard,
    itemToDelete,
    setItemToDelete,
    openPreviewModal,
    openDeleteConfirmation,
  };
};

export default useModal;
