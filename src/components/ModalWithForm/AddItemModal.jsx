import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState("Add Garment");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
      setButtonText("Add Garment");
    }
  }, [isOpen]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setButtonText("Adding...");

    onAddItem({ name, imageUrl, weather })
      .then(() => {
        onCloseModal();
      })
      .catch(() => {
        setButtonText("Add Garment");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <div className="modal__input-group">
        <label htmlFor="item-name" className="modal__label">
          Name
        </label>
        <input
          type="text"
          id="item-name"
          className="modal__input_name"
          placeholder="Item Name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="image-url" className="modal__label">
          Image
        </label>
        <input
          type="text"
          id="image-url"
          className="modal__input_URL"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
      </div>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select Weather Type</legend>
        <label htmlFor="weather-hot" className="modal__label">
          <input
            type="radio"
            id="weather-hot"
            name="weather"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label htmlFor="weather-warm" className="modal__label">
          <input
            type="radio"
            id="weather-warm"
            name="weather"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="weather-cold" className="modal__label">
          <input
            type="radio"
            id="weather-cold"
            name="weather"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;