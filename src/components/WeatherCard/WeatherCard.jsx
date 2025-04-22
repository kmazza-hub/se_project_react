// src/components/WeatherCard/WeatherCard.jsx
import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData) {
    return null; // Don't render until weatherData is ready
  }

  // ✅ Normalize condition to lowercase
  const normalizedCondition = weatherData.condition?.toLowerCase();
  const isDay = weatherData.isDay;
  const temp = weatherData.temp;

  // ✅ Match normalized condition
  const weatherOption = weatherOptions.find(
    (option) => option.condition === normalizedCondition && option.day === isDay
  );

  // ✅ If not found, fallback to default day/night
  const imageUrl = weatherOption
    ? weatherOption.url
    : isDay
    ? defaultWeatherOptions.day.url
    : defaultWeatherOptions.night.url;

  const temperature = temp?.[currentTemperatureUnit];

  return (
    <section className="weather-card">
      {temperature !== undefined ? (
        <>
          <p className="weather-card__temp">
            {temperature}°{currentTemperatureUnit}
          </p>
          <img
            src={imageUrl}
            alt={`Weather: ${normalizedCondition}`}
            className="weather-card__image"
          />
        </>
      ) : (
        <p className="weather-card__temp">Loading weather...</p>
      )}
    </section>
  );
}

export default WeatherCard;
