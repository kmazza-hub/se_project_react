// src/components/ItemModal/ItemModal.jsx
import React from "react";
import closeIcon from "../../images/close-icon2.png";
import "./ItemModal.css";

function ItemModal({ isOpen, item, onClose, onDelete }) {
  if (!item) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content-preview">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="modal__preview-image"
        />
        <div className="modal__description">
          <div className="modal__text-info">
            <p className="modal__item-name">{item.name}</p>
            <p className="modal__item-weather">Weather: {item.weather}</p>
          </div>
          <button
            type="button"
            className="modal__delete-button"
            onClick={onDelete}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
