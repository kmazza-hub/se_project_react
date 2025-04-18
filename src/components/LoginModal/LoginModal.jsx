import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, onRegister }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Log In"
      name="login"
      buttonText="Log In"
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          required
          className="modal__input"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          required
          className="modal__input"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <p className="modal__toggle-text">
        Not a member yet?{" "}
        <button
          type="button"
          className="modal__toggle-button"
          onClick={onRegister}
        >
          Sign up here
        </button>
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
