import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, handleAddClick, handleDeleteCard, onCardLike, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items to only show the logged-in user's items
  const userItems = clothingItems.filter((item) => item.owner === currentUser?._id);

  return (
    <div className="clothes-section">
      <div className="clothes-section__title">
        <p className="clothes-section__item">Your items</p>
        <button className="clothes-section__btn" type="button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      {userItems.length > 0 ? (
        <ul className="clothes-section__list">
          {userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              handleDeleteCard={handleDeleteCard}
              onCardLike={onCardLike} 
            />
          ))}
        </ul>
      ) : (
        <p className="clothes-section__empty">No items added yet.</p>
      )}
    </div>
  );
}

export default ClothesSection;
