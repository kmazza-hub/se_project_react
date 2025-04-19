import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SideBar from "../Profile/SideBar"; // ✅ Corrected
import ClothesSection from "./ClothesSection";
import "./Profile.css";


function Profile({ clothingItems, onCardClick, handleAddClick, onEditProfileClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} />
      <div className="profile__content">
        <div className="profile__info">
          <h2 className="profile__name">{currentUser?.name}</h2>
          <button className="profile__add-button" onClick={handleAddClick}>
            + Add Clothes
          </button>
        </div>
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default Profile;
