import React, { useState, useEffect } from "react";
import { getWeather, filterWeatherData } from "../../utils/api"; // Import weather functions
import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, latitude = 0, longitude = 0, APIkey = "" }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Fetch weather data on component mount or when location/latitude changes
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeather({ latitude, longitude }, APIkey);
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude, APIkey]);

  // If loading, show loading state
  if (loading) {
    return <div>Loading weather...</div>;
  }

  // If there's an error, show error state
  if (error) {
    return <div>{error}</div>;
  }

  // If weather data is available, render the header
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city || "Unknown location"}
      </p>
      <p className="header__weather-condition">
        {weatherData?.condition || "Condition unavailable"}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        +Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
