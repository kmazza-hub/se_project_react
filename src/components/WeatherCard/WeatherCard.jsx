// src/components/WeatherCard/WeatherCard.jsx
import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";  
import "./WeatherCard.css";
import Sunny from "../../images/Sunny1.png"; // You can swap this to dynamic images later

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperature = weatherData?.temp?.[currentTemperatureUnit];
  const city = weatherData?.city;

  return (
    <section className="weather-card">
      {temperature !== undefined && city ? (
        <>
          <p className="weather-card__temp">
            {temperature}°{currentTemperatureUnit}
          </p>
          <img src={Sunny} alt="Weather" className="weather-card__image" />
        </>
      ) : (
        <p className="weather-card__temp">Loading weather...</p>
      )}
    </section>
  );
}

export default WeatherCard;
