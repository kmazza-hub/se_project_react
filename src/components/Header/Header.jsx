// src/components/Header/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../images/Wtwr-logo.svg";

function Header({ handleAddClick, onLoginClick, onSignUpClick, onLogout, isLoggedIn }) {
  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={Logo} alt="WTWR Logo" className="header__logo" />
        </Link>
        <p className="header__date-location">{currentDate}, New York</p>
      </div>

      <div className="header__right">
        {isLoggedIn ? (
          <>
            <button className="header__add-button" onClick={handleAddClick}>
              + Add clothes
            </button>
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
