import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeBtnImage from "../../images/like-btn.png";
import likeBtnActiveImage from "../../images/like-btn-active.png";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLikes }) {
  const { _id, name, imageUrl, likes } = item;
  const currentUser = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(
    currentUser ? likes.some((id) => id === currentUser._id) : false
  );

  useEffect(() => {
    setIsLiked(
      currentUser ? likes.some((id) => id === currentUser._id) : false
    );
  }, [likes, currentUser]);

  const itemLikeButtonClassName = isLiked
    ? "item-card__like-button_active"
    : "item-card__like-button";

  const handleCardLikes = () => {
    if (!currentUser) {
      console.log("Please log in to like items.");
      return;
    }

    const previousIsLiked = isLiked; 
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    const result = onCardLikes({ id: item._id, isLiked: newIsLiked });

    if (result instanceof Promise) {
      result
        .then(() => {})
        .catch((error) => {
          console.error("Failed to toggle like:", error);
          setIsLiked(previousIsLiked); 
        });
    }
  };

  const handleImageClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card">
      <img
        src={imageUrl}
        alt={name}
        className="item-card__image"
        onClick={handleImageClick}
      />
      <div className="item-card__header">
        <div className="item-card__name">{name}</div>
        {currentUser && (
          <button
            className={`${itemLikeButtonClassName}`} // Dynamically apply the class
            onClick={handleCardLikes}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <img
              src={isLiked ? likeBtnActiveImage : likeBtnImage}
              alt={isLiked ? "Unlike" : "Like"}
              className="item-card__like-image"
            />
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;