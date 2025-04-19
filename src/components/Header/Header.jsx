import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ weatherData, handleAddClick, onLoginClick, onSignUpClick, onLogout, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          wtwr
        </Link>
        <p className="header__location">
          {weatherData?.temp?.F ? `${weatherData.temp.F}°F | ${weatherData.city}` : "Loading..."}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button className="header__add-button" onClick={handleAddClick}>
              + Add Clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <p className="header__profile-name">{currentUser?.name}</p>
              <img
                src={currentUser?.avatar || "https://via.placeholder.com/40"}
                alt="Profile"
                className="header__avatar"
              />
            </Link>
            <button className="header__logout-button" onClick={onLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <button className="header__auth-button" onClick={onLoginClick}>
              Log In
            </button>
            <button className="header__auth-button" onClick={onSignUpClick}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
