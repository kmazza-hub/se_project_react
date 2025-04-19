// src/components/Profile/ClothesSection.jsx
import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({ clothingItems = [], onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Show only the current user's items
  const filteredItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
      </div>
      <ul className="clothes-section__list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onDeleteClick={onDelete}
            />
          ))
        ) : (
          <p>No items to display</p>
        )}
      </ul>
    </section>
  );
}

export default ClothesSection;
