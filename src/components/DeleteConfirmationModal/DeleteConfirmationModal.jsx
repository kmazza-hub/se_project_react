import "./DeleteConfirmationModal.css";
import closeButtonImage from "../../images/closebutton.svg";

function DeleteConfirmationModal({
  card,
  handleCloseClick,
  handleCardDelete,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__delete-container">
        <button
          onClick={handleCloseClick}
          className="modal__close"
          type="button"
        >
          <img
            className="modal__close-icon"
            src={closeButtonImage}
            alt="Close Button"
          />
        </button>
        <h2 className="modal__title">
          Are you sure you want to delete this item? <br /> This action is
          Irreversible.
        </h2>
        <div className="modal__actions">
          <button
            className="modal__confirm-button"
            onClick={() => handleCardDelete(card)}
          >
            Yes, delete item
          </button>
          <button className="modal__cancel-button" onClick={handleCloseClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;