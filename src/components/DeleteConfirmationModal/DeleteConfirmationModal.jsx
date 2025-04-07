import React from "react";
import "./DeleteConfirmationModal.css";
import closeIcon2 from "../../images/close-icon2.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, item }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_delete-confirmation">
      <div className="modal__content-delete">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeIcon2}
            alt="Close"
            className="modal__close-icon-garment"
          />
        </button>
        <h2 className="modal__title-delete">
          Are you sure you want to delete this item?
        </h2>
        <p className="modal__text-delete">This action is irreversible.</p>
        <div className="modal__buttons-delete">
          <button className="modal__delete-button-confirm" onClick={onConfirm}>
            Yes, delete item
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