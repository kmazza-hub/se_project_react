import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import logo from "../../images/Wtwr-logo.svg";

function Header({ weatherData, handleAddClick, onLoginClick, onSignUpClick, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container">
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
                <p className="header__username">
                  {currentUser?.name || "User"}
                </p>
                <img
                  className="header__avatar"
                  src={currentUser?.avatar || "https://via.placeholder.com/40"}
                  alt="User avatar"
                />
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
      </div>
    </header>
  );
}

export default Header;
