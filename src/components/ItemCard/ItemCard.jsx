// src/components/ItemCard/ItemCard.jsx
import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeBtnImage from "../../images/like-btn.png";
import likeBtnActiveImage from "../../images/like-btn-active.png";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLikes }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (currentUser && item.likes) {
      setIsLiked(item.likes.includes(currentUser._id));
    }
  }, [item.likes, currentUser]);

  const handleLikeClick = () => {
    if (!currentUser) {
      console.log("You must be logged in to like items.");
      return;
    }

    const previousLiked = isLiked;
    setIsLiked(!isLiked);

    const result = onCardLikes({ id: item._id, isLiked: !isLiked });

    if (result instanceof Promise) {
      result.catch((err) => {
        console.error("Failed to toggle like", err);
        setIsLiked(previousLiked);
      });
    }
  };

  const handleImageClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card">
      <div className="item-card__header">
        <p className="item-card__name">{item.name}</p>
        {currentUser && (
          <button
            className="item-card__like-button"
            onClick={handleLikeClick}
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
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
        onClick={handleImageClick}
      />
    </li>
  );
}

export default ItemCard;
