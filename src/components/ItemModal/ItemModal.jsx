// src/components/ItemModal/ItemModal.jsx
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import closeIcon2 from "../../images/close-icon2.png";
import "./ItemModal.css";

function ItemModal({ isOpen, item, onClose, onDeleteRequest }) {
  const currentUser = useContext(CurrentUserContext);

  if (!isOpen || !item) return null;

  const isOwn = currentUser && item.owner === currentUser._id;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content-preview">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon2} alt="Close" className="modal__close-icon" />
        </button>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="modal__preview-image"
        />
        <div className="modal__body">
          <div className="modal__header">
            <p className="modal__title">{item.name}</p>
            {isOwn && (
              <button
                type="button"
                className="modal__delete-button"
                onClick={() => onDeleteRequest(item)}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {item.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
