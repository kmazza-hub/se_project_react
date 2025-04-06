import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Add a check to ensure weatherData and clothingItems are defined and in expected formats
  if (!weatherData || !Array.isArray(clothingItems)) {
    console.error("Invalid data received in Main component", { weatherData, clothingItems });
    return <div>Error loading data.</div>;  // Fallback UI in case data is invalid
  }

  return (
    <main>
      {weatherData && <WeatherCard weatherData={weatherData} />}
      <section className="cards">
        {weatherData && (
          <p className="cards__text">
            Today is {weatherData.temp[currentTemperatureUnit]}&deg;
            {currentTemperatureUnit} / You may want to wear:
          </p>
        )}
        <ul className="cards__list">
          {(Array.isArray(clothingItems) ? clothingItems : [])
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                handleCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
