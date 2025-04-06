import "./Header.css";
import Logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData?.city || "Loading..."}
      </p>
      <ToggleSwitch />
      <button
        type="button"
        onClick={handleAddClick}
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">
            {currentUser ? currentUser.name : "Guest"}
          </p>
          {currentUser && currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="header__user-image"
            />
          ) : (
            <div className="header__avatar-placeholder">
              {currentUser ? currentUser.name.charAt(0).toUpperCase() : "?"}
            </div>
          )}
        </div>
      </Link>
    </header>
  );
}

export default Header;
