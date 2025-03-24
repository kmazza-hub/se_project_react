import React from "react";

const EditProfileModal = ({ onClose }) => {
  return (
    <div className="modal">
      <h2>Edit Profile</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditProfileModal;
