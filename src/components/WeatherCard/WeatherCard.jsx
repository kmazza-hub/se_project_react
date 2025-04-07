import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";  
import "./WeatherCard.css";
import Sunny from "../../images/Sunny1.png";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData?.temp?.[currentTemperatureUnit]} &deg;
        {currentTemperatureUnit}
      </p>
      <img src={Sunny} alt="Sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;