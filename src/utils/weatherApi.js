// weatherApi.js

import { checkResponse } from './api'; // ✅ Reusing existing checkResponse

// Function to fetch weather data from OpenWeatherMap API
export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

// Helper function to categorize weather based on temperature
const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 85) {
    return "warm";
  } else {
    return "cold";
  }
};

// Function to filter and format weather data
export const filterWeatherData = (data) => {
  const tempF = data.main.temp;
  return {
    city: data.name,
    temp: {
      F: tempF,
      C: Math.round((tempF - 32) * (5 / 9)),
    },
    type: getWeatherType(tempF),
  };
};