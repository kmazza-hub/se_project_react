import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ChangeProfileModal.css";

function ChangeProfileModal({ isOpen, onClose, onChangeProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onChangeProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save Changes"
    >
      <div className="modal__input-group">
        <label htmlFor="name" className="modal__label">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="modal__input-group">
        <label htmlFor="avatar" className="modal__label">
          Avatar URL
        </label>
        <input
          type="text"
          id="avatar"
          className="modal__input"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </div>
    </ModalWithForm>
  );
}

export default ChangeProfileModal;