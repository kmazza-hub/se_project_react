import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onLogin, onClose, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      title="Log in"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      submitText="Log in" // You can handle submit text directly here
    >
      <div className="modal__input-group">
        <label htmlFor="email" className="modal__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="password" className="modal__label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="modal__buttons">
        <button type="submit" className="modal__submit-login">
          Log in
        </button>
        <button
          type="button"
          onClick={onRegister}  // Directly call onRegister for the "Sign Up" action
          className="modal__register-link"
        >
          Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
