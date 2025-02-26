import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, onCardClick, clothingItems, handleDeleteClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Use defaultClothingItems if clothingItems is empty
  const itemsToRender = clothingItems.length > 0 ? clothingItems : defaultClothingItems;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit} / You might want to wear:
        </p>
        <ul className="cards__list">
          {itemsToRender
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onClick={handleDeleteClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
