// src/components/AddItemModal/AddItemModal.jsx
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const isFormValid = name && imageUrl && weather;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New Garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__form">
        <label htmlFor="name" className="modal__label">
          Name*
        </label>
        <input
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="imageUrl" className="modal__label">
          Image URL*
        </label>
        <input
          type="url"
          id="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <p className="modal__weather-label">Select the weather type:</p>

        <div className="modal__radio-group">
          <input
            type="radio"
            id="weather-hot"
            name="weather"
            value="hot"
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
          <label htmlFor="weather-hot" className="modal__radio-label">
            Hot
          </label>

          <input
            type="radio"
            id="weather-warm"
            name="weather"
            value="warm"
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
          <label htmlFor="weather-warm" className="modal__radio-label">
            Warm
          </label>

          <input
            type="radio"
            id="weather-cold"
            name="weather"
            value="cold"
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
          <label htmlFor="weather-cold" className="modal__radio-label">
            Cold
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        className={`modal__submit-garment ${!isFormValid ? "modal__submit-garment_disabled" : ""}`}
        disabled={!isFormValid}
      >
        Add garment
      </button>
    </ModalWithForm>
  );
}

export default AddItemModal;
