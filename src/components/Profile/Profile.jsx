import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfileClick,
  onDelete,
}) {
  const onCardLike = (itemId) => {};

  return (
    <div className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} />
      <ClothesSection
        items={clothingItems}
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
        onItemDelete={onDelete}
      />
    </div>
  );
}
export default Profile;