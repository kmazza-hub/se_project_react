// src/components/DeleteConfirmationModal/DeleteConfirmationModal.jsx
import React from "react";
import "./DeleteConfirmationModal.css";
import closeIcon from "../../images/close-icon2.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, item }) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content-delete">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <h2 className="modal__title-delete">Are you sure?</h2>
        <p className="modal__text-delete">
          This item will be deleted. This action cannot be undone.
        </p>
        <div className="modal__buttons-delete">
          <button className="modal__delete-button-confirm" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="modal__cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
