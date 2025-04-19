// src/components/SignUpModal/SignUpModal.jsx
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SignUpModal.css";

function SignUpModal({ onSignUp, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ email, password, name, avatar: avatarUrl });
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={true}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__form">
        <label className="modal__label">Email*</label>
        <input
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="modal__label">Password*</label>
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="modal__label">Name*</label>
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="modal__label">Avatar URL</label>
        <input
          type="url"
          className="modal__input"
          placeholder="Avatar URL (optional)"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </fieldset>

      <button type="submit" className="modal__submit-button">Next</button>
      <div className="modal__alt-container">
        <p className="modal__alt-text">
          or{" "}
          <button type="button" className="modal__alt-button" onClick={onLogin}>
            Log in
          </button>
        </p>
      </div>
    </ModalWithForm>
  );
}

export default SignUpModal;
