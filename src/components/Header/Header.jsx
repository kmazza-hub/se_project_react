// src/components/Header/Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ handleAddClick, onLoginClick, onSignUpClick, onLogout, isLoggedIn, weatherData }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">wtwr°</Link>
        <p className="header__date">{currentDate}, {weatherData?.city || "New York"}</p>
      </div>

      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button className="header__add-button" onClick={handleAddClick}>+ Add Clothes</button>
            <Link to="/profile" className="header__profile-link">
              <p className="header__profile-name">{currentUser?.name}</p>
              <img src={currentUser?.avatar} alt="User Avatar" className="header__avatar" />
            </Link>
            <button className="header__logout" onClick={onLogout}>Log out</button>
          </>
        ) : (
          <>
            <button className="header__auth-button" onClick={onSignUpClick}>Sign Up</button>
            <button className="header__auth-button" onClick={onLoginClick}>Log In</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;