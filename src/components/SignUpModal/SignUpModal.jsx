// src/components/SignUpModal/SignUpModal.jsx
import React, { useState } from "react";
import "./SignUpModal.css";
import closeIcon from "../../images/close-icon2.png";

function SignUpModal({ isOpen, onClose, onSignUp, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ email, password, name, avatar });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        <h2 className="modal__title">Sign up</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__input-group">
            <label className="modal__label" htmlFor="signup-email">Email*</label>
            <input
              id="signup-email"
              type="email"
              className="modal__input"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="modal__input-group">
            <label className="modal__label" htmlFor="signup-password">Password*</label>
            <input
              id="signup-password"
              type="password"
              className="modal__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="modal__input-group">
            <label className="modal__label" htmlFor="signup-name">Name*</label>
            <input
              id="signup-name"
              type="text"
              className="modal__input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="modal__input-group">
            <label className="modal__label" htmlFor="signup-avatar">Avatar URL*</label>
            <input
              id="signup-avatar"
              type="url"
              className="modal__input"
              placeholder="https://example.com/avatar.png"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </div>

          <div className="modal__buttons">
            <button type="submit" className="modal__submit-login">
              Next
            </button>

            <button type="button" className="modal__register-link" onClick={onLogin}>
              or Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
