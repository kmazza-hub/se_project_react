import React, { useState } from "react";
import "./LoginModal.css";
import closeIcon from "../../images/close-icon2.png";

function LoginModal({ isOpen, onClose, onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        <h2 className="modal__title">Log in</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__input-group">
            <label className="modal__label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="modal__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="modal__input-group">
            <label className="modal__label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="modal__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="modal__buttons">
            <button
              type="submit"
              className="modal__submit-login"
            >
              Log in
            </button>

            <button
              type="button"
              className="modal__register-link"
              onClick={onRegister}
            >
              or Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
