// src/components/Header/Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch"; // ✅ ADD TOGGLESWITCH!
import "./Header.css";
import Logo from "../../images/logo.svg"; // Replace with your logo
import Avatar from "../../images/Avatar.png"; // Replace with your avatar

function Header({ handleAddClick, onLoginClick, onSignUpClick, onLogout, isLoggedIn, weatherData }) {
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

      {/* Date */}
      <p className="header__date">{currentDate}</p>

      {/* Weather (optional) */}
      {weatherData?.city && (
        <p className="header__location">{weatherData.city}</p>
      )}

      {/* Toggle Switch for Fahrenheit / Celsius */}
      <ToggleSwitch />

      {/* Right-side user area */}
      <div className="header__user-area">
        {isLoggedIn ? (
          <>
            {/* Link to Profile */}
            <Link to="/profile" className="header__profile-link">
              <p className="header__profile-name">{currentUser?.name || "User"}</p>
              <img
                src={currentUser?.avatar || Avatar}
                alt="User Avatar"
                className="header__avatar"
              />
            </Link>
            {/* Add Clothes Button */}
            <button className="header__add-button" onClick={handleAddClick}>
              + Add Clothes
            </button>
            {/* Log Out Button */}
            <button className="header__logout" onClick={onLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            {/* Auth buttons if not logged in */}
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
