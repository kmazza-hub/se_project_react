import React, { useContext, useEffect } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, clothingItems, handleCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  useEffect(() => {
    console.log('Weather data received in Main:', weatherData);
    console.log('Clothing items received in Main:', clothingItems);
  }, [weatherData, clothingItems]);

  // Use defaultClothingItems if clothingItems is empty
  const clothingItemsToDisplay = clothingItems.length > 0 ? clothingItems : defaultClothingItems;

  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        isDayTime={new Date().getHours() >= 6 && new Date().getHours() < 18} // Simple check for day or night
      />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit}
        </p>
        <ul className="cards__list">
          {clothingItemsToDisplay.length === 0 ? (
            <p>No items available.</p>
          ) : (
            clothingItemsToDisplay
              .filter(
                (item) => item.weather.toLowerCase() === weatherData.type.toLowerCase()
              )
              .map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLikes={onCardLike}
                />
              ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
