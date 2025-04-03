import React, { useState, useEffect } from "react";

const EditProfileModal = ({ isOpen, onClose, currentUser, onUpdate }) => {
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedUser = { name, avatar };

    updateUserProfile(updatedUser)
      .then((updatedUserData) => {
        onUpdate(updatedUserData); 
        setIsSaving(false);
        onClose(); 
      })
      .catch((error) => {
        console.error("Error updating profile", error);
        setIsSaving(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export const updateUserProfile = async (updatedUser) => {
  const token = localStorage.getItem("jwt");

  const response = await fetch("http://localhost:3001/users/me", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const data = await response.json();
  return data; 
};

export default EditProfileModal;
