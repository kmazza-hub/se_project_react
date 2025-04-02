import React, { useState } from "react";
import "./RegisterModal.css"; 

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  
  const [error, setError] = useState(""); // Add error state
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      avatar: formData.avatar || "https://default-avatar.com/avatar.png", // Default avatar URL
    };

    setIsSubmitting(true); // Set submitting state to true while API call is in progress
    try {
      await onRegister(updatedFormData); // Call onRegister function passed from App
      setFormData({ name: "", avatar: "", email: "", password: "" }); // Reset form after successful registration
      onClose(); // Close the modal after successful registration
    } catch (err) {
      setError("Registration failed. Please try again."); // Set error message if registration fails
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>} {/* Display error message if there is an error */}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="avatar">Avatar URL</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isSubmitting}> 
            {isSubmitting ? "Registering..." : "Register"} {/* Disable button while submitting */}
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegisterModal;
