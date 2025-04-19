// src/components/AddItemModal/AddItemModal.jsx
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onCloseModal, onAddItem }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

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
      buttonText="Add garment"
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Image URL
        <input
          type="url"
          className="modal__input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Select the weather type:
        <div className="modal__radio-group">
          <label>
            <input
              type="radio"
              name="weather"
              value="hot"
              onChange={(e) => setWeather(e.target.value)}
              required
            />
            Hot
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="warm"
              onChange={(e) => setWeather(e.target.value)}
            />
            Warm
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="cold"
              onChange={(e) => setWeather(e.target.value)}
            />
            Cold
          </label>
        </div>
      </label>
    </ModalWithForm>
  );
}

export default AddItemModal;
