import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants"; // Import weather options

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Determine if it's day or night based on the current hour
  const isDayTime = new Date().getHours() >= 6 && new Date().getHours() < 18; // 6 AM to 6 PM

  // Normalize and determine weather condition
  const weatherCondition = weatherData?.type?.toLowerCase() || "clear";

  // Get the appropriate weather image based on condition and time of day
  const weatherImage =
    weatherOptions.find(
      (option) =>
        option.day === isDayTime && option.condition === weatherCondition
    ) || (isDayTime ? defaultWeatherOptions.day : defaultWeatherOptions.night);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData?.temp?.[currentTemperatureUnit]} &deg;
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherImage.url}
        alt={`Weather: ${weatherCondition}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
