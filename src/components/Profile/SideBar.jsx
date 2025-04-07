import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../images/avatar.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfileClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    navigate("/");
    window.location.reload();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={currentUser?.avatar || avatar}
          alt="User Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button
        onClick={onEditProfileClick}
        className="sidebar__change-profile-btn"
      >
        Change Profile Data
      </button>
      <button onClick={handleLogOut} className="sidebar__logout-btn">
        Log out
      </button>
    </div>
  );
}

export default SideBar;