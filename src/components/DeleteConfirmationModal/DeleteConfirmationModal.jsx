// src/components/DeleteConfirmationModal/DeleteConfirmationModal.jsx
import React from "react";
import "./DeleteConfirmationModal.css";
import closeIcon from "../../images/close-icon2.png"; // or your close icon path

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, item }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_delete-confirmation">
      <div className="modal__content-delete">
        <button type="button" onClick={onClose} className="modal__close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <h2 className="modal__title-delete">Delete Confirmation</h2>
        <p className="modal__text-delete">
          Are you sure you want to delete "{item?.name}"?
        </p>
        <div className="modal__buttons-delete">
          <button
            className="modal__delete-button-confirm"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className="modal__cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
