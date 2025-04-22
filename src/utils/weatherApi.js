// src/utils/weatherApi.js

import { checkResponse } from './api'; // ✅ Reusing checkResponse

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
  } else if (temperature >= 66 && temperature <= 85) {
    return "warm";
  } else {
    return "cold";
  }
};

// Function to determine if it’s day or night based on API
const isDaytime = (icon) => {
  return icon.includes("d"); // API icons have "d" for day, "n" for night
};

// ✅ Correct filterWeatherData to include condition and isDay
export const filterWeatherData = (data) => {
  const tempF = data.main.temp;

  return {
    city: data.name,
    temp: {
      F: Math.round(tempF),
      C: Math.round((tempF - 32) * (5 / 9)),
    },
    type: getWeatherType(tempF),
    condition: data.weather[0].main,   
    isDay: isDaytime(data.weather[0].icon), 
  };
};
