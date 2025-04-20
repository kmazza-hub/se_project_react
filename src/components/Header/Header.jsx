// src/components/Header/Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import Avatar from "../../images/Avatar.png"; // ✅ Correct import of Avatar.png!

function Header({ handleAddClick, onLoginClick, onSignUpClick, onLogout, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  // Get today's date in "Month Day" format (e.g., April 19)
  const today = new Date();
  const options = { month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          {/* You can replace this text with a real logo image if you want */}
          <div className="header__logo-text">wtwr</div>
        </Link>
        <p className="header__date">{formattedDate}, New York</p>
      </div>

      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button className="header__add-clothes-btn" onClick={handleAddClick}>
              + Add clothes
            </button>
            <div className="header__user-info">
              <p className="header__user-name">{currentUser?.name || "Username"}</p>
              <img
                src={currentUser?.avatar || Avatar}
                alt="User Avatar"
                className="header__user-avatar"
              />
              <button className="header__logout-btn" onClick={onLogout}>
                Log Out
              </button>
            </div>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button className="header__auth-button" onClick={onLoginClick}>
              Log In
            </button>
            <button className="header__auth-button" onClick={onSignUpClick}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
