import "./ItemModal.css";

function ItemModal({ activeModal, handleCloseClick, card, onDeleteClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close modal__close_item"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <button
          type="text"
          className="modal__delete-btn"
          onClick={onDeleteClick}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;