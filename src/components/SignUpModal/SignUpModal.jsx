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
      title="Sign Up"
      isOpen={true}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText=""
    >
      <div className="modal__input-group">
        <label htmlFor="name-input" className="modal__label">
          Name
        </label>
        <input
          type="text"
          id="name-input"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="email-input" className="modal__label">
          Email
        </label>
        <input
          type="email"
          id="email-input"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="password-input" className="modal__label">
          Password
        </label>
        <input
          type="password"
          id="password-input"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="avatarUrl-input" className="modal__label">
          Avatar URL
        </label>
        <input
          type="url"
          id="avatarUrl-input"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          required
        />
      </div>
      <div className="modal__buttons">
        <button type="button" onClick={onLogin} className="modal__login-link">
          Log In
        </button>
        <p className="modal__or-text">or</p>
        <button type="submit" className="modal__submit">
          Next
        </button>
      </div>
    </ModalWithForm>
  );
}

export default SignUpModal;