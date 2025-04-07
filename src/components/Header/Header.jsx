import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/Wtwr-logo.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  currentTemperatureUnit,
  handleToggleSwitchChange,
  onLoginClick,
  onSignUpClick,
  onLogout,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const isOnProfilePage = location.pathname === "/profile";

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="wtwr logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch
        isChecked={currentTemperatureUnit === "C"}
        onToggle={handleToggleSwitchChange}
      />

      {currentUser && !isOnProfilePage && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      )}

      {currentUser ? (
        <div className="header__user-container">
          <Link to="/profile">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser.name
                  ? currentUser.name.charAt(0).toUpperCase()
                  : "?"}
              </div>
            )}
          </Link>
          <button
            className="header__logout-btn"
            onClick={onLogout}
            type="button"
          >
            Log Out
          </button>
        </div>
      ) : (
        <>
          <button
            className="header__login-btn"
            type="button"
            onClick={onLoginClick}
          >
            Login
          </button>
          <button
            className="header__signup-btn"
            type="button"
            onClick={onSignUpClick}
          >
            Sign Up
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
