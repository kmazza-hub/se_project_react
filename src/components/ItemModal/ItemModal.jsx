import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ item, onClose, onDelete, isOpen }) {
  const currentUser = useContext(CurrentUserContext);

  if (!item) {
    return null;
  }

  const isOwn = currentUser && item.owner === currentUser._id;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content-item">
        
        {/* Close Button */}
        <button onClick={onClose} type="button" className="modal__close">
          ✕
        </button>

        {/* Item Image */}
        <img src={item.imageUrl} alt={item.name} className="modal__item-image" />

        {/* Footer */}
        <div className="modal__item-footer">
          <div className="modal__item-info">
            <h2 className="modal__item-name">{item.name}</h2>
            <p className="modal__item-weather">Weather: {item.weather}</p>
          </div>

          {/* Delete Button */}
          {isOwn && (
            <button
              type="button"
              className="modal__delete-button"
              onClick={() => onDelete(item)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
