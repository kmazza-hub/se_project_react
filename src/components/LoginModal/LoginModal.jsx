import React, { useState } from "react";

const LoginModal = ({ isOpen, onClose, onLogin, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { email, password };
    onLogin(credentials);  // Call the onLogin passed from App.jsx
  };

  return (
    isOpen && (
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    )
  );
};

export default LoginModal;
