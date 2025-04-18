// src/components/Header/Header.jsx
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import logo from "../../images/Wtwr-logo.svg";
import "./Header.css"; // <-- Make sure you import your updated Header.css

function Header({ weatherData, handleAddClick, onLoginClick, onSignUpClick, onLogout, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="WTWR logo" className="header__logo" />
        <p className="header__weather">
          {weatherData?.city
            ? `${weatherData.temp.F}°F | ${weatherData.city}`
            : "Loading weather..."}
        </p>
      </div>

      <div className="header__right">
        {isLoggedIn ? (
          <>
            <button
              className="header__add-button"
              type="button"
              onClick={handleAddClick}
            >
              + Add Clothes
            </button>
            <div className="header__user-info">
              <p className="header__username">{currentUser?.name || "User"}</p>
              <img
                className="header__avatar"
                src={currentUser?.avatar || "https://via.placeholder.com/40"}
                alt="User avatar"
              />
              <button
                className="header__auth-button"
                type="button"
                onClick={onLogout}
              >
                Log Out
              </button>
            </div>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button className="header__auth-button" onClick={onSignUpClick}>
              Sign Up
            </button>
            <button className="header__auth-button" onClick={onLoginClick}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
