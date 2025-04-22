// src/components/AddItemModal/AddItemModal.jsx
import React, { useState } from "react";
import "./AddItemModal.css";
import closeIcon from "../../images/close-icon2.png";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !imageUrl || !weather) return; // Don't submit if fields are empty
    onAddItem({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
    setWeather("");
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close-btn" onClick={onCloseModal}>
          <img src={closeIcon} alt="Close" />
        </button>

        <h2 className="modal__title">New garment</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__input-group">
            <label className="modal__label" htmlFor="item-name">Name</label>
            <input
              id="item-name"
              type="text"
              className="modal__input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="modal__input-group">
            <label className="modal__label" htmlFor="item-url">Image URL</label>
            <input
              id="item-url"
              type="url"
              className="modal__input"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          <div className="modal__input-group">
            <label className="modal__label">Select the weather type:</label>

            <div className="modal__radio-group">
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="hot"
                  checked={weather === "hot"}
                  onChange={(e) => setWeather(e.target.value)}
                  required
                />
                Hot
              </label>

              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="warm"
                  checked={weather === "warm"}
                  onChange={(e) => setWeather(e.target.value)}
                />
                Warm
              </label>

              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="cold"
                  checked={weather === "cold"}
                  onChange={(e) => setWeather(e.target.value)}
                />
                Cold
              </label>
            </div>
          </div>

          <div className="modal__buttons">
            <button
              type="submit"
              className="modal__submit-button"
              disabled={!name || !imageUrl || !weather}
            >
              Add garment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
