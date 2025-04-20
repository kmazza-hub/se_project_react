// src/components/Header/Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Header.css";
import Logo from "../../images/logo.svg"; // <-- replace with your correct logo
import Avatar from "../../images/Avatar.png"; // <-- replace with your avatar if needed

function Header({ handleAddClick, onLoginClick, onSignUpClick, onLogout, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* Logo always links to homepage */}
      <Link to="/" className="header__logo-link">
        <img src={Logo} alt="Logo" className="header__logo" />
      </Link>

      {/* Date display */}
      <p className="header__date">{currentDate}</p>

      {/* ToggleSwitch if you have it */}
      {/* <ToggleSwitch /> */}

      {/* Right-side user area */}
      <div className="header__user-area">
        {isLoggedIn ? (
          <>
            {/* Link to /profile with avatar and name */}
            <Link to="/profile" className="header__profile-link">
              <p className="header__profile-name">{currentUser?.name || "User"}</p>
              <img src={currentUser?.avatar || Avatar} alt="User Avatar" className="header__avatar" />
            </Link>
            {/* Button to Add Clothes */}
            <button className="header__add-button" onClick={handleAddClick}>
              + Add Clothes
            </button>
            {/* Log Out */}
            <button className="header__logout" onClick={onLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            {/* If not logged in, show Sign Up / Login */}
            <button className="header__auth-button" onClick={onSignUpClick}>
              Sign Up
            </button>
            <button className="header__auth-button" onClick={onLoginClick}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
