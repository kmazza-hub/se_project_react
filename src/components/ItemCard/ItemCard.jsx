import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeBtnImage from "../../images/like-btn.png";
import likeBtnActiveImage from "../../images/like-btn-active.png";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLikes, onDeleteClick }) {
  const { _id, name, imageUrl, likes, owner } = item;
  const currentUser = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(
    currentUser ? likes.includes(currentUser._id) : false
  );

  useEffect(() => {
    setIsLiked(currentUser ? likes.includes(currentUser._id) : false);
  }, [likes, currentUser]);

  const handleCardLikes = () => {
    if (!currentUser) {
      console.log("Please log in to like items.");
      return;
    }

    const previousIsLiked = isLiked;
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    const result = onCardLikes({ id: _id, isLiked: newIsLiked });

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

  const handleDeleteClick = () => {
    onDeleteClick(item); // opens the DeleteConfirmationModal with this item
  };

  const isOwn = currentUser && owner === currentUser._id;

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
        <div className="item-card__actions">
          {currentUser && (
            <button
              className="item-card__like-button"
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
      </div>
    </li>
  );
}

export default ItemCard;
