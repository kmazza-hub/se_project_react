import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLikes }) {
  const currentUser = useContext(CurrentUserContext);
  const { _id, name, imageUrl, likes } = item;

  const isLiked = currentUser && likes.includes(currentUser._id);

  const handleLikeClick = () => {
    onCardLikes({ id: _id, isLiked });
  };

  const handleImageClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card">
      <div className="item-card__top">
        <div className="item-card__name-heart-container">
          <div className="item-card__name-tag">{name}</div>
          <button
            type="button"
            className={`item-card__like-button ${isLiked ? "item-card__like-button_liked" : ""}`}
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike" : "Like"}
          />
        </div>
      </div>
      <img
        src={imageUrl}
        alt={name}
        className="item-card__image"
        onClick={handleImageClick}
      />
    </li>
  );
}

export default ItemCard;
