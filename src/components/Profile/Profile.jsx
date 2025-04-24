// src/components/Profile/Profile.jsx
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfileClick,
  onDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} />
      <div className="profile__content">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onDelete={onDelete}
          onAddItem={handleAddClick}
          onCardLike={onCardLike} // ✅ Pass it here
        />
      </div>
    </div>
  );
}

export default Profile;
