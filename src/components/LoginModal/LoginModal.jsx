// src/components/LoginModal/LoginModal.jsx
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onLogin, onClose, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <ModalWithForm
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__form">
        <label className="modal__label">Email</label>
        <input
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="modal__label">Password</label>
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </fieldset>

      <div className="modal__action-container">
        <button type="submit" className="modal__submit-button">
          Log in
        </button>
        <p className="modal__alt-text">
          or{" "}
          <button type="button" className="modal__alt-button" onClick={onRegister}>
            Register
          </button>
        </p>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
