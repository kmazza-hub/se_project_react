import React from "react";
import "./DeleteConfirmationModal.css";
import closeIcon2 from "../../images/close-icon2.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, item }) {
  // If modal is not open, return null to prevent rendering
  if (!isOpen) return null;

  // Ensure item details are displayed in a meaningful way
  const itemName = item ? item.name : "Item"; // Default to "Item" if no item is passed

  return (
    <div className="modal modal_delete-confirmation">
      <div className="modal__content-delete">
        {/* Close button */}
        <button onClick={onClose} type="button" className="modal__close" aria-label="Close modal">
          <img
            src={closeIcon2}
            alt="Close"
            className="modal__close-icon-garment"
          />
        </button>

        {/* Modal title */}
        <h2 className="modal__title-delete">
          Are you sure you want to delete <strong>{itemName}</strong>?
        </h2>

        {/* Warning text */}
        <p className="modal__text-delete">
          This action is irreversible.
        </p>

        {/* Action buttons */}
        <div className="modal__buttons-delete">
          {/* Confirm delete button */}
          <button
            className="modal__delete-button-confirm"
            onClick={onConfirm}
            aria-label={`Delete ${itemName}`}
          >
            Yes, delete item
          </button>

          {/* Cancel button */}
          <button
            className="modal__cancel-button"
            onClick={onClose}
            aria-label="Cancel delete action"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
