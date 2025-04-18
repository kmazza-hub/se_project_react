import "./ModalWithForm.css"; 
import closeIcon2 from "../../images/close-icon2.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content-form">
        {/* X CLOSE BUTTON comes first inside the white box */}
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeIcon2}
            alt="Close"
            className="modal__close-icon-garment"
          />
        </button>

        {/* Then the title */}
        <h2 className="modal__title-garment">{title}</h2>

        {/* Then the form */}
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          {buttonText && (
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
