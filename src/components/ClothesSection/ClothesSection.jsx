import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  handleAddClick,
  handleDeleteCard,
  clothingItems,
}) {
  const itemsToRender = clothingItems.length > 0 ? clothingItems : defaultClothingItems;

  return (
    <div className="clothes-section">
      <div className="clothes-section__title">
        <p className="clothes-section__item">Your items</p>
        <button
          className="clothes-section__btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {itemsToRender.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            handleDeleteCard={handleDeleteCard}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
